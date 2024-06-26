const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/user-routes');
const inventoriesRoutes = require('./routes/inventories-routes');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const reservationRoutes = require('./routes/reservation-routes');

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api', userRoutes);

app.use('/api', inventoriesRoutes);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use('/api', reservationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on ${PORT}`);
});