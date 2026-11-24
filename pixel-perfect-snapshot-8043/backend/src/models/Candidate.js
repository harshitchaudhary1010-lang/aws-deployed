import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    party: {
      type: String,
      required: [true, 'Party is required'],
      trim: true,
      minlength: [2, 'Party name must be at least 2 characters'],
      maxlength: [100, 'Party name cannot exceed 100 characters'],
    },
    constituency: {
      type: String,
      required: [true, 'Constituency is required'],
      trim: true,
      minlength: [2, 'Constituency must be at least 2 characters'],
      maxlength: [100, 'Constituency cannot exceed 100 characters'],
    },
    symbol: {
      type: String,
      required: [true, 'Symbol is required'],
      trim: true,
      minlength: [1, 'Symbol must be at least 1 character'],
      maxlength: [50, 'Symbol cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    isSample: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
candidateSchema.index({ name: 1 });
candidateSchema.index({ constituency: 1 });
candidateSchema.index({ party: 1 });

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;
