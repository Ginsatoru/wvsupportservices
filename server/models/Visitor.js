const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitorSchema = new Schema(
  {
    visitorFingerprint: { 
      type: String, 
      required: true, 
      index: true 
    },
    ipAddress: {
      type: String,
      required: true
    },
    geo: {
      country: String,
      city: String,
      region: String,
      timezone: String,
      ll: [Number], // [longitude, latitude]
    },
    userAgent: {
      raw: String,
      parsed: {
        browser: {
          name: String,
          version: String,
        },
        os: {
          name: String,
          version: String,
        },
        device: {
          type: String,
          vendor: String,
          model: String,
        },
      },
    },
    referrer: {
      type: String,
      default: 'direct'
    },
    initialPath: {
      type: String,
      required: true
    },
    paths: [
      {
        path: {
          type: String,
          required: true
        },
        firstSeen: {
          type: Date,
          default: Date.now
        },
        lastSeen: {
          type: Date,
          default: Date.now
        },
        views: { 
          type: Number, 
          default: 1 
        },
        referrer: {
          type: String,
          default: 'direct'
        },
      },
    ],
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere",
    },
    pageViews: { 
      type: Number, 
      default: 1 
    },
    sessionPageViews: { 
      type: Number, 
      default: 1 
    },
    sessionDuration: {
      type: Number,
      default: 0
    },
    longestSession: {
      type: Number,
      default: 0
    },
    isReturning: {
      type: Boolean,
      default: false
    },
    firstSeen: {
      type: Date,
      default: Date.now
    },
    lastActive: {
      type: Date,
      default: Date.now,
      index: true
    },
  },
  {
    timestamps: true
  }
);

// Compound indexes for better query performance
visitorSchema.index({ visitorFingerprint: 1, lastActive: 1 });
visitorSchema.index({ "geo.country": 1 });
visitorSchema.index({ "userAgent.parsed.device.type": 1 });
visitorSchema.index({ "userAgent.parsed.browser.name": 1 });
visitorSchema.index({ createdAt: 1 });
visitorSchema.index({ "paths.path": 1 });
visitorSchema.index({ ipAddress: 1 });

// Virtual for determining if visitor is currently active (last 5 minutes)
visitorSchema.virtual('isActive').get(function() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return this.lastActive > fiveMinutesAgo;
});

// Virtual for total session time in minutes
visitorSchema.virtual('sessionTimeMinutes').get(function() {
  return Math.round((this.sessionDuration || 0) / 60);
});

// Static method to get active visitors count
visitorSchema.statics.getActiveCount = function() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return this.countDocuments({ lastActive: { $gte: fiveMinutesAgo } });
};

// Static method to get today's unique visitors
visitorSchema.statics.getTodayUniqueCount = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return this.distinct('visitorFingerprint', {
    createdAt: { $gte: today, $lt: tomorrow }
  }).then(result => result.length);
};

// Instance method to update session duration
visitorSchema.methods.updateSessionDuration = function(additionalTime) {
  this.sessionDuration = (this.sessionDuration || 0) + additionalTime;
  this.longestSession = Math.max(this.longestSession || 0, this.sessionDuration);
  this.lastActive = new Date();
  return this.save();
};

// Pre-save middleware to update coordinates from geo data
visitorSchema.pre('save', function(next) {
  if (this.geo && this.geo.ll && this.geo.ll.length === 2) {
    this.coordinates = this.geo.ll;
  }
  next();
});

module.exports = mongoose.model("Visitor", visitorSchema);