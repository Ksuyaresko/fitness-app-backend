const app = require('./app')
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.DB_HOST);
connection
    .then(() => {
      console.log('Database connection successful');
      app.listen(3000, () => {
        console.log("Server running. Use our API on port: 3000")
      })
    })
    .catch(err => {
      console.log("err", err);
      process.exit(1);
    }
    );
