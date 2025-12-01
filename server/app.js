require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

sequelize.sync().then(() => {
  app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
});