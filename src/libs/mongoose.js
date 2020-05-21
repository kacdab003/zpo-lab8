const mongoose = require('mongoose');

const { MONGODB_URI, MONGODB_URI_TEST } = process.env;

const MONGO_OPTIONS = {
  connectTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 5,
  useNewUrlParser: true,
  useCreateIndex: true,
  // useUnifiedTopology: true -> https://github.com/Automattic/mongoose/issues/8180
};

const connectWithRetry = () => {
  const connectionString = process.env.NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI;

  return mongoose.connect(connectionString, MONGO_OPTIONS, (err) => {
    if (err) {
      console.error('Retrying connection to the DB...');
      setTimeout(connectWithRetry, 5000);
    }
  });
};

connectWithRetry();
mongoose.connectWithRetry = connectWithRetry;

module.exports = mongoose;
