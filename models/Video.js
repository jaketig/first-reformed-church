import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  publishedAt: {
    type: Date
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: Object,
    properties: {
      url: {
        type: String,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number
      }
    }
  }
}, {
  timestamps: true
})

export default mongoose?.models?.Video || mongoose.model('Video', VideoSchema);