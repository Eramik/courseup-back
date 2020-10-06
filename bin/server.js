const http = require('http');
const dotenv = require('dotenv');
const app = require('../app'); 

/**
 * This command will read our config variables and set them to env variables
 */ 
dotenv.config({ path: '../config.env' });

/**
 * Set server port
 */
const port = process.env.PORT || '4000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Start and listen to server
 */
server.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});
