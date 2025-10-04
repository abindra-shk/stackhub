import dotenv from 'dotenv';
import { connectDB } from './db/index.js';

dotenv.config({
  path: './.env',
});

connectDB();

// import express from 'express';

// const app = express();
// const PORT = process.env.PORT || 8000;

// (async () => {
//   try {
//     mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on('error', (error) => {
//       console.log('error:', error);
//       throw error;
//     });
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log('error:', error);
//     throw error;
//   }
// })();
