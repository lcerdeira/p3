
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Category = require('./models/Category');
const Location = require('./models/Location');
const User = require('./models/User');
const Place = require('./models/Place');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const category = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/category.json`, 'utf-8')
);

const location = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/location.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const place = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/place.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Category.create(category);
    await Location.create(location);
    await User.create(users);
    await Place.create(place);
    console.log('Data Imported Successfuly'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Location.deleteMany();
    await User.deleteMany();
    await Place.deleteMany();
    console.log('Data Destroyed Successfuly'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}


// const connectDB = async () => {
//   try {
//     if (process.env.NODE_ENV === 'production') {
//       await mongoose.connect(
//         `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@-.mongodb.net/tgr?retryWrites=true&w=majority`,
//         {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//           useCreateIndex: true,
//           useFindAndModify: false
//         }
//       );
//       console.log('MongoDB Atlas Connected');
//     } else {
//       await mongoose.connect('mongodb://localhost:27017/tgr', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//       });
//       console.log('MongoDB Localhost Connected');
//     }
//   } catch (err) {
//     console.error(err.message);
    
//     // Exit process with failure
//     process.exit(1);
//   }
// };

