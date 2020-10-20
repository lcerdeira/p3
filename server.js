const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

const compression = require('compression');

// Load environment files
dotenv.config({ path: './middleware/config.env' });

// Connect Database
connectDB();

const app = express();

// Body parser
app.use(express.json());
// app.use(express.json({ extended: false }));

// Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Route files
const items = require('./routes/api/items');
const auth = require('./routes/api/auth');
const users = require('./routes/api/users');

// app.use(logger);
// Dev logger midlleware
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// Serve static assets in production
if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static('client/build'));
  app.use(morgan('prod'));
}

// File uploading
app.use(fileUpload());

// app.post('/upload', (req, res) => {
//   if (!req.files) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }
//   const { file } = req.files;
//   file.mv(`${__dirname}/public/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     res.json({ fileName: file.name, filePath: `/${file.name}` });
//   });
// });

// Sanitize data
app.use(mongoSanitize());

// Set security header
app.use(helmet());

// Prevent XSS atacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent HTTP param pollution
app.use(hpp());

// ?
app.use(compression());

// Enable Cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

// Define Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Just after routes declaration we have to use our errorHandler (remind linear order)
app.use(errorHandler);

// Running the server
const server = app.listen(
  PORT,
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode, using port ${PORT}`
      .yellow.bold
  )
);
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
