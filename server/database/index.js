// Connect to Mongo database
const mongoose = require('mongoose');
// Remove the warning with Promise
mongoose.Promise = global.Promise;

const configDB = require('../../config/mongo/keys');

try {
  /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  mongoose
    .connect(configDB.mongoURI).then(() => {
      console.log('Connected to Mongo');
  })
} catch (err) {
    /** handle initial connection error */
    console.log('error connecting to Mongo: ');
    console.log(err);
}

module.exports = mongoose.connection;
