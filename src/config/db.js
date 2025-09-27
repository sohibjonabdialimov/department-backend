const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB bilan ulanish o\'rnatildi');
  } catch (err) {
    console.error('MongoDB ulanish xatosi:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
