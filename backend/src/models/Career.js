const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: String,
  location: String,
  type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'] },
  experience: String,
  salary: String,
  description: String,
  requirements: [String],
  responsibilities: [String],
  isActive: { type: Boolean, default: true },
  deadline: Date,
}, { timestamps: true });

const jobApplicationSchema = new mongoose.Schema({
  career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: String,
  coverLetter: String,
  status: { type: String, enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'], default: 'pending' },
}, { timestamps: true });

module.exports = {
  Career: mongoose.model('Career', careerSchema),
  JobApplication: mongoose.model('JobApplication', jobApplicationSchema),
};
