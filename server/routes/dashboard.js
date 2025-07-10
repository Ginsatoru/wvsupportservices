const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    // Total visitors (last 30 days)
    const totalVisitors = await Visitor.countDocuments({
      timestamp: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Engaged readers (spent > 30 seconds or visited multiple pages)
    const engagedReaders = await Visitor.countDocuments({
      $or: [
        { sessionDuration: { $gt: 30 } },
        { isReturning: true }
      ],
      timestamp: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Unique countries reached
    const countriesReached = await Visitor.distinct('country', {
      timestamp: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      totalVisitors,
      engagedReaders,
      countriesReached: countriesReached.filter(Boolean).length // filter out null/undefined
    });
  } catch (err) {
    console.log('Tracking engagement - IP:', ip, 'Time spent:', timeSpent);
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;