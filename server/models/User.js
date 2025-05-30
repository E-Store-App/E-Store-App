const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: '' },
  verifyOtpExcpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Number, default: false },
  resetOtp: { type: String, default: '' },
  resOtpExpiredAt: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   verifyOtp: { type: String, default: '' },
//   verifyOtpExcpireAt: { type: Number, default: 0 },
//   isAccountVerified: { type: Number, default: false },
//   resetOtp: { type: String, default: '' },
//   resOtpExpiredAt: { type: Number, default: 0 }
// });

// module.exports = mongoose.model('User', userSchema);