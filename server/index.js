const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const warehousesRoutes = require('./routes/warehouses-routes');
const inventoriesRoutes = require('./routes/inventories-routes');

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api', warehousesRoutes);

app.use('/api', inventoriesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on ${PORT}`);
});