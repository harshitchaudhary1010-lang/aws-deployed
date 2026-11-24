import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [10, 'Content must be at least 10 characters'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    category: {
      type: String,
      enum: ['General', 'Important', 'Update', 'Alert'],
      default: 'General',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
announcementSchema.index({ publishedDate: -1 });
announcementSchema.index({ category: 1 });
announcementSchema.index({ isActive: 1 });

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
