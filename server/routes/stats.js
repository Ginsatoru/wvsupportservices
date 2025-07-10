// routes/stats.js
router.get('/today-stats', async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Local time
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [visitors, views] = await Promise.all([
      // Unique visitors
      Visitor.countDocuments({
        firstSeen: { $gte: startOfDay, $lte: endOfDay }
      }),
      
      // Total page views
      Visitor.aggregate([
        { 
          $match: { 
            lastActive: { $gte: startOfDay, $lte: endOfDay } 
          } 
        },
        { 
          $group: { 
            _id: null, 
            totalViews: { $sum: "$pageViews" } 
          } 
        }
      ])
    ]);

    res.json({
      uniqueVisitors: visitors,
      pageViews: views[0]?.totalViews || 0
    });
  } catch (error) {
    console.error('Today stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});