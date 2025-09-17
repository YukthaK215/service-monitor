const express = require('express');
const cors = require('cors');
const monitorRoutes = require('./routes/monitor');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/monitor', monitorRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));