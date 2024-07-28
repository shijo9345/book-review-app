const express = require('express');
const cors = require('cors');
const sequelize = require('./models/connection');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/api', bookRoutes); 
app.use('/review',reviewRoutes)

app.use('/images', express.static(( 'images')));

app.get('/', (req, res) => {
  res.send('Book Review');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected successfully.');

    await sequelize.sync({ alter: true });
    console.log('Models synchronized with database.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
