import mongoose from "mongoose"

const CalendarEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
    enum: ['service', 'birthday', 'anniversary', 'other'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
  },
  recurrence: {
    type: Object,
    properties: {
      interval: {
        type: String,
        enum: [ 'day', 'week', 'month', 'year']
      },
      numIntervals: {
        type: Number
      }
    }
  },
  visibility: {
    type: String,
    enum: ['public', 'members'],
    required: true,
  },
}, {
  timestamps: true
})

export default mongoose?.models?.CalendarEvent || mongoose.model('CalendarEvent', CalendarEventSchema);