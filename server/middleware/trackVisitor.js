const Visitor = require("../models/Visitor");
const geoip = require("geoip-lite");
const { parse: parseUserAgent } = require("user-agent");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment-timezone");

// Configuration
const TRACKING_CONFIG = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  TIMEZONE: "America/New_York", // Set your server's timezone
  EXCLUDED_PATHS: ["/admin", "/api", "/_next", "/static", "/health"],
  REAL_TIME_UPDATE_INTERVAL: 5000 // 5 seconds
};

// Enhanced visitor tracking middleware
const trackVisitor = async (req, res, next) => {
  try {
    // Skip tracking for excluded paths
    if (TRACKING_CONFIG.EXCLUDED_PATHS.some(path => req.path.startsWith(path))) {
      return next();
    }

    // Get client IP with proper header handling
    const ip = getClientIp(req);
    if (!ip || isLocalIp(ip)) {
      debugLog(`Skipping local IP: ${ip}`);
      return next();
    }

    // Get geo and user agent data
    const { geo, userAgentData } = await getVisitorMetadata(ip, req.headers["user-agent"]);

    // Create visitor fingerprint
    const visitorFingerprint = createFingerprint(ip, userAgentData);

    // Process visitor data
    const { isNewVisitor, visitor } = await processVisitor(
      visitorFingerprint,
      {
        ip,
        geo,
        userAgent: req.headers["user-agent"],
        userAgentData,
        path: req.path,
        referrer: req.headers.referer
      }
    );

    // Update real-time analytics
    if (isNewVisitor) {
      updateRealtimeStats('new_visitor', visitor);
    } else {
      updateRealtimeStats('page_view', visitor);
    }

    // Attach visitor info to request
    req.visitorInfo = {
      isNew: isNewVisitor,
      fingerprint: visitorFingerprint,
      country: geo?.country,
      visitorId: visitor._id
    };

  } catch (err) {
    console.error(`[Visitor Tracking Error] ${err.message}`, {
      path: req.path,
      ip: req.ip,
      timestamp: new Date()
    });
  } finally {
    next();
  }
};

// Helper Functions
function getClientIp(req) {
  return req.headers["x-forwarded-for"]?.split(',')[0]?.trim() || 
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         req.connection?.socket?.remoteAddress;
}

function isLocalIp(ip) {
  return ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.");
}

async function getVisitorMetadata(ip, userAgent) {
  let geo = null;
  try {
    geo = geoip.lookup(ip);
    if (!geo) {
      debugLog(`No geo data for IP: ${ip}`);
    }
  } catch (geoError) {
    console.warn(`[GeoIP Error] ${geoError.message}`, { ip });
  }

  let userAgentData = {};
  try {
    userAgentData = parseUserAgent(userAgent || "");
  } catch (uaError) {
    console.warn(`[UserAgent Error] ${uaError.message}`, { userAgent });
  }

  return { geo, userAgentData };
}

function createFingerprint(ip, userAgentData) {
  const browser = userAgentData.browser?.name || "unknown";
  const device = userAgentData.device?.type || "desktop";
  return `${ip}-${browser}-${device}-${uuidv4().slice(0, 8)}`;
}

async function processVisitor(fingerprint, metadata) {
  const sessionWindow = new Date(Date.now() - TRACKING_CONFIG.SESSION_TIMEOUT);
  const now = new Date();

  // Try to find existing visitor
  const existingVisitor = await Visitor.findOneAndUpdate(
    {
      visitorFingerprint: fingerprint,
      lastActive: { $gte: sessionWindow }
    },
    {
      $inc: { 
        pageViews: 1,
        sessionPageViews: 1
      },
      $set: { 
        lastActive: now,
        isReturning: true,
        "userAgent.raw": metadata.userAgent,
        "userAgent.parsed": metadata.userAgentData
      }
    },
    { new: true }
  );

  if (existingVisitor) {
    // Update or add path entry
    const pathExists = existingVisitor.paths.find(p => p.path === metadata.path);
    if (pathExists) {
      await Visitor.updateOne(
        {
          _id: existingVisitor._id,
          "paths.path": metadata.path
        },
        {
          $inc: { "paths.$.views": 1 },
          $set: { "paths.$.lastSeen": now }
        }
      );
    } else {
      await Visitor.updateOne(
        { _id: existingVisitor._id },
        {
          $push: {
            paths: {
              path: metadata.path,
              firstSeen: now,
              lastSeen: now,
              views: 1,
              referrer: metadata.referrer || "direct"
            }
          }
        }
      );
    }

    return {
      isNewVisitor: false,
      visitor: existingVisitor
    };
  }

  // Create new visitor
  const newVisitorData = {
    visitorFingerprint: fingerprint,
    ipAddress: metadata.ip,
    geo: metadata.geo ? {
      country: metadata.geo.country,
      city: metadata.geo.city,
      region: metadata.geo.region,
      timezone: metadata.geo.timezone,
      ll: metadata.geo.ll
    } : null,
    userAgent: {
      raw: metadata.userAgent,
      parsed: metadata.userAgentData
    },
    referrer: metadata.referrer || "direct",
    initialPath: metadata.path,
    paths: [{
      path: metadata.path,
      firstSeen: now,
      lastSeen: now,
      views: 1,
      referrer: metadata.referrer || "direct"
    }],
    pageViews: 1,
    sessionPageViews: 1,
    isReturning: false,
    lastActive: now,
    firstSeen: now,
    coordinates: metadata.geo?.ll || null
  };

  const newVisitor = await Visitor.create(newVisitorData);
  return {
    isNewVisitor: true,
    visitor: newVisitor
  };
}

function updateRealtimeStats(eventType, visitor) {
  // Implement with your preferred real-time solution (Socket.io, Pusher, etc.)
  // Example:
  // realtimeService.emit('visitor_activity', {
  //   type: eventType,
  //   visitorId: visitor._id,
  //   country: visitor.geo?.country,
  //   timestamp: new Date()
  // });
}

function debugLog(message) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[DEBUG] ${message}`);
  }
}

// Today's date range helper with timezone support
function getTodayRange() {
  return {
    start: moment().tz(TRACKING_CONFIG.TIMEZONE).startOf('day').toDate(),
    end: moment().tz(TRACKING_CONFIG.TIMEZONE).endOf('day').toDate()
  };
}

module.exports = {
  trackVisitor,
  getTodayRange
};