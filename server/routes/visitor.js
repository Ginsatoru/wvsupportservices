const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const { trackVisitor, getTodayRange } = require('../middleware/trackVisitor');

// Track initial visit
router.post('/track-visit', trackVisitor, (req, res) => {
  try {
    const { visitorInfo } = req;
    
    res.status(200).json({ 
      message: 'Visit tracked successfully',
      isNewVisitor: visitorInfo?.isNew || false,
      country: visitorInfo?.country,
      visitorId: visitorInfo?.visitorId
    });
  } catch (error) {
    console.error('Error in track-visit route:', error);
    res.status(500).json({ error: 'Error tracking visit' });
  }
});

// Track engagement (time spent)
router.post('/track-engagement', async (req, res) => {
  try {
    const { timeSpent, path, visitorFingerprint } = req.body;
    
    // Validate input
    if (!timeSpent || !path) {
      return res.status(400).json({ error: 'timeSpent and path are required' });
    }

    const sessionWindow = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes
    const timeSpentSeconds = parseInt(timeSpent);
    
    const visitor = await Visitor.findOneAndUpdate(
      { 
        visitorFingerprint: visitorFingerprint,
        lastActive: { $gte: sessionWindow }
      },
      { 
        $inc: { sessionDuration: timeSpentSeconds },
        $set: { 
          lastActive: new Date()
        },
        $max: {
          longestSession: timeSpentSeconds
        }
      },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({ error: 'Visitor session not found or expired' });
    }

    res.status(200).json({ 
      message: 'Engagement tracked successfully',
      sessionDuration: visitor.sessionDuration,
      longestSession: visitor.longestSession
    });
  } catch (err) {
    console.error('Error tracking engagement:', err);
    res.status(500).json({ error: 'Error tracking engagement' });
  }
});

// Get visitor analytics dashboard data
router.get('/analytics', async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    let dateFilter = {};
    
    switch (period) {
      case 'today':
        const { start, end } = getTodayRange();
        dateFilter = { createdAt: { $gte: start, $lte: end } };
        break;
      case 'week':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case 'month':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
        break;
      default:
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } };
    }

    const analytics = await Promise.all([
      // Total visitors
      Visitor.countDocuments(dateFilter),
      
      // Unique visitors
      Visitor.distinct('visitorFingerprint', dateFilter).then(result => result.length),
      
      // Total page views
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: '$pageViews' } } }
      ]).then(result => result[0]?.total || 0),
      
      // Top countries
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$geo.country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      
      // Top pages
      Visitor.aggregate([
        { $match: dateFilter },
        { $unwind: '$paths' },
        { $group: { _id: '$paths.path', views: { $sum: '$paths.views' } } },
        { $sort: { views: -1 } },
        { $limit: 10 }
      ]),
      
      // Device types
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$userAgent.parsed.device.type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      // Browser stats
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$userAgent.parsed.browser.name', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      
      // Hourly activity (for today)
      period === 'today' ? Visitor.aggregate([
        { $match: dateFilter },
        { 
          $group: { 
            _id: { $hour: '$createdAt' }, 
            count: { $sum: 1 } 
          } 
        },
        { $sort: { '_id': 1 } }
      ]) : Promise.resolve([])
    ]);

    res.status(200).json({
      period,
      summary: {
        totalVisitors: analytics[0],
        uniqueVisitors: analytics[1],
        totalPageViews: analytics[2],
        returningVisitors: analytics[0] - analytics[1]
      },
      topCountries: analytics[3],
      topPages: analytics[4],
      deviceTypes: analytics[5],
      browsers: analytics[6],
      hourlyActivity: analytics[7]
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Error fetching analytics data' });
  }
});

// Get real-time visitor activity
router.get('/realtime', async (req, res) => {
  try {
    const last5Minutes = new Date(Date.now() - 5 * 60 * 1000);
    
    const realtimeData = await Visitor.find({
      lastActive: { $gte: last5Minutes }
    })
    .select('geo.country geo.city paths.path lastActive userAgent.parsed.device.type')
    .sort({ lastActive: -1 })
    .limit(50);

    const activeVisitors = await Visitor.countDocuments({
      lastActive: { $gte: last5Minutes }
    });

    res.status(200).json({
      activeVisitors,
      recentActivity: realtimeData
    });
  } catch (err) {
    console.error('Error fetching realtime data:', err);
    res.status(500).json({ error: 'Error fetching realtime data' });
  }
});

// Get visitor details by fingerprint
router.get('/visitor/:fingerprint', async (req, res) => {
  try {
    const { fingerprint } = req.params;
    
    const visitor = await Visitor.findOne({ visitorFingerprint: fingerprint });
    
    if (!visitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    res.status(200).json(visitor);
  } catch (err) {
    console.error('Error fetching visitor details:', err);
    res.status(500).json({ error: 'Error fetching visitor details' });
  }
});

// Get visitor journey (path flow)
router.get('/journey/:fingerprint', async (req, res) => {
  try {
    const { fingerprint } = req.params;
    
    const visitor = await Visitor.findOne(
      { visitorFingerprint: fingerprint },
      { paths: 1, firstSeen: 1, lastActive: 1, pageViews: 1 }
    );
    
    if (!visitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    // Sort paths by first seen to show journey
    const journey = visitor.paths.sort((a, b) => new Date(a.firstSeen) - new Date(b.firstSeen));

    res.status(200).json({
      fingerprint,
      firstSeen: visitor.firstSeen,
      lastActive: visitor.lastActive,
      totalPageViews: visitor.pageViews,
      journey
    });
  } catch (err) {
    console.error('Error fetching visitor journey:', err);
    res.status(500).json({ error: 'Error fetching visitor journey' });
  }
});

// Export visitor data (CSV format)
router.get('/export', async (req, res) => {
  try {
    const { format = 'json', period = 'month' } = req.query;
    
    let dateFilter = {};
    switch (period) {
      case 'today':
        const { start, end } = getTodayRange();
        dateFilter = { createdAt: { $gte: start, $lte: end } };
        break;
      case 'week':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case 'month':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
        break;
    }

    const visitors = await Visitor.find(dateFilter)
      .select('visitorFingerprint ipAddress geo userAgent referrer pageViews sessionDuration isReturning firstSeen lastActive')
      .sort({ createdAt: -1 });

    if (format === 'csv') {
      const csvData = visitors.map(visitor => ({
        fingerprint: visitor.visitorFingerprint,
        ip: visitor.ipAddress,
        country: visitor.geo?.country || 'Unknown',
        city: visitor.geo?.city || 'Unknown',
        browser: visitor.userAgent?.parsed?.browser?.name || 'Unknown',
        device: visitor.userAgent?.parsed?.device?.type || 'desktop',
        referrer: visitor.referrer,
        pageViews: visitor.pageViews,
        sessionDuration: visitor.sessionDuration || 0,
        isReturning: visitor.isReturning,
        firstSeen: visitor.firstSeen,
        lastActive: visitor.lastActive
      }));

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=visitors_${period}.csv`);
      
      // Simple CSV conversion (you might want to use a proper CSV library)
      const csvHeaders = Object.keys(csvData[0] || {}).join(',');
      const csvRows = csvData.map(row => Object.values(row).join(','));
      const csvContent = [csvHeaders, ...csvRows].join('\n');
      
      res.send(csvContent);
    } else {
      res.status(200).json({
        period,
        count: visitors.length,
        data: visitors
      });
    }
  } catch (err) {
    console.error('Error exporting visitor data:', err);
    res.status(500).json({ error: 'Error exporting visitor data' });
  }
});

module.exports = router;