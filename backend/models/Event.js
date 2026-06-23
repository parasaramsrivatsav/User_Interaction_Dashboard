const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  sessionId: String,
  eventType: String,
  pageUrl: String,
  timestamp: Date,
  clickX: Number,
  clickY: Number,
  pageWidth: Number,
  pageHeight: Number
});

module.exports = mongoose.model("Event", EventSchema);