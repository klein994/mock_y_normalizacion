const mongoose = require('mongoose');


const connectionString = 'mongodb+srv://klein994:Kl3in171@cluster0.pg7zl.mongodb.net/?retryWrites=true&w=majority'

const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
    console.log(connectionString)
    await mongoose.connect(connectionString);

    console.log('YA ESTOY CONECTADO a Mongoose');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

module.exports = initMongoDB; 