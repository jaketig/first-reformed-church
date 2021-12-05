import mongoose from "mongoose"

const AnnouncementSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roles: {
    type: Array,
    properties: {
      type: String
    }
  },
  failedLoginAttempts: {
    type: Number
  },
  lastLogin: {
    type: Date,
  }
}, {
  timestamps: true
})

export default mongoose?.models?.Announcement || mongoose.model('Announcement', AnnouncementSchema);