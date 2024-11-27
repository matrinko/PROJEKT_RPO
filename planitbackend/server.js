const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Povezava z MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Povezava z MongoDB je uspešna!'))
  .catch((err) => console.log('Napaka pri povezavi z MongoDB:', err));

// API rute
app.use('/api/projects', projectRoutes);

// Osnovna ruta
app.get('/', (req, res) => {
  res.send('Backend strežnik deluje!');
});

// Poslušanje na vratih
app.listen(PORT, () => console.log(`Strežnik teče na http://localhost:${PORT}`));
