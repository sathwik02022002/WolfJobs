const mongoose = require('mongoose');

// Auth OTP Schema
const authOtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Middleware to automatically remove expired OTPs
authOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const AuthOtp = mongoose.model('AuthOtp', authOtpSchema);

module.exports = AuthOtp;