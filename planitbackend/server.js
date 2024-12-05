const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const nalogeRoutes = require('./routes/naloge')
const usersRoutes = require('./routes/users')
const friendchatRoutes = require('./routes/friendchats')
const addFriendRoute = require('./routes/addFriendRoute')
const groupChatRoutes = require('./routes/groupchats')
const opravilaRoutes = require('./routes/opravila')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Povezava z MongoDB je uspešna!'))
  .catch((err) => console.log('Napaka pri povezavi z MongoDB:', err));

app.use('/api/projects', projectRoutes);
app.use('/api/naloge', nalogeRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/friendchats', friendchatRoutes);
app.use('/api/addFriend', addFriendRoute);
app.use('/api/groupchats', groupChatRoutes);
app.use('/api/opravila', opravilaRoutes);




app.listen(PORT, () => console.log(`Strežnik teče na http://localhost:${PORT}`));
