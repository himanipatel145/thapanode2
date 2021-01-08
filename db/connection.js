const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/newForm', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection
    .once('open', () => console.log("Mongo Connected"))
    .on('error', (error) => console.log("Error", error))