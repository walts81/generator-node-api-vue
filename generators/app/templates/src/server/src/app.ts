import express from 'express';
import path from 'path';
import { initRoutes } from './router';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App is running on port ${PORT}`);
  console.log();
});
