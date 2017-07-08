const mongoose = require('mongoose');

const PORT = process.env.PORT || 8888;

const [major, minor] = process.versions.node.split('.').map(parseFloat);
if( major < 7 || (major === 7 && minor <= 5) ) {
    console.log('Node version is too old. Please update node to 7.6 or higher');
    process.exit();
}

require('dotenv').config({ path: 'variables.env'});

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (err) => {
    console.log('Mongoose Error:\n\n', err );
});
db.once('open', () => {
    console.log('Mongoose connection successful!');
});

// Import Models HERE!!!!!!!
require('./models/Product');

const app = require('./app');
app.set('port', PORT);
app.listen(PORT, () => {
    console.log(`Express Server running on Port: ${PORT}`);
});

