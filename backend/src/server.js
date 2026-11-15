require('dotenv').config();
const app = require('./app');

const port = Number(process.env.API_PORT || process.env.PORT || 3000);
app.listen(port, () => console.log(`Smart POS API listening on port ${port}`));
