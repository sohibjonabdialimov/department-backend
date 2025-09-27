require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => res.send('Universitet kafedra tizimi API yurgizuvchisi'));

// Xatolik handler
app.use(errorHandler);

// Connect DB and start
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portda yuritilmoqda`);
  });
});
