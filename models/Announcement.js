import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
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

export default mongoose?.models?.User || mongoose.model('User', UserSchema);