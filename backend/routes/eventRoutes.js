const router = require("express").Router();
const Event = require("../models/Event");

/* Track Events */
router.post("/track", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get All Sessions */
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$sessionId",
          totalEvents: { $sum: 1 }
        }
      },
      {
        $sort: {
          totalEvents: -1
        }
      }
    ]);

    res.json(sessions);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});

/* Get Events By Session */
router.get("/session/:id", async (req, res) => {

  try {

    const events = await Event.find({
      sessionId: req.params.id
    }).sort({
      timestamp: 1
    });

    res.json(events);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Heatmap Data */
router.get("/heatmap", async (req, res) => {
  try {
    const pageUrl = req.query.pageUrl;

    if (!pageUrl) {
      return res.status(400).json({
        message: "pageUrl query parameter is required"
      });
    }

    let clicks = await Event.find({
      pageUrl,
      eventType: "click"
    });

    if (clicks.length === 0) {
      const normalized = pageUrl.replace(/^https?:\/\//i, "").replace(/\/$/, "");
      const regex = new RegExp(escapeRegex(normalized), "i");

      clicks = await Event.find({
        pageUrl: { $regex: regex },
        eventType: "click"
      });
    }

    res.json(clicks);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

/* Dashboard Summary */
router.get("/summary", async (req, res) => {

  try {

    const sessions =
      await Event.distinct("sessionId");

    const clicks =
      await Event.countDocuments({
        eventType: "click"
      });

    const pageViews =
      await Event.countDocuments({
        eventType: "page_view"
      });

    const totalEvents =
      await Event.countDocuments();

    res.json({
      totalSessions: sessions.length,
      totalClicks: clicks,
      totalPageViews: pageViews,
      totalEvents
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

/* Analytics Endpoint */
router.get("/analytics", async (req, res) => {

  try {

    const clicks =
      await Event.countDocuments({
        eventType: "click"
      });

    const pageViews =
      await Event.countDocuments({
        eventType: "page_view"
      });

    const sessions =
      await Event.distinct("sessionId");

    res.json({
      totalSessions: sessions.length,
      totalClicks: clicks,
      totalPageViews: pageViews,
      averageClicksPerSession:
        sessions.length
          ? (clicks / sessions.length).toFixed(2)
          : 0
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

/* Top Pages */
router.get("/top-pages", async (req, res) => {

  try {

    const pages = await Event.aggregate([
      {
        $group: {
          _id: "$pageUrl",
          views: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          views: -1
        }
      }
    ]);

    res.json(pages);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;