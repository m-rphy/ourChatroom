const express = require('express');
const expressWs = require('express-ws');
// const authController = require('./authController.js')

const app = express();
expressWs(app);


// Authentication server -> 
//////////////////////////////////////////////////////////////////////////////////////

// // handle login authentication
// app.use('/api/login',
//   authController.isValid,
//   (req, res) => {
//     console.log(`Valid login by ${res.locals.username}`);
//     return res.status(200).send();
//   })

// // handle signups
// app.post('/api', 
//   authController.addUser,
//   (req, res) => {
//     console.log(`Added user ${res.locals.newUser}`)
//     res.status(200).send();
//   });
//   // used for the post request from the Login and Signup page


// Server db for development

const users = new Set();

// Helper function to send messsages to the users
const sendMessage = (message) => {
    for (const user of users) {
        user.socket.send(JSON.stringify(message));
    }
};


// Websocket isn't allowed until the user is authenticated at AuthPage or SignUpPge
/////////////////////////////////////////////////////////////////////////////////////////
app.use(express.static('dist'))

app.ws('/', async (socket, req) => {
    console.log('New conection', socket)

    const userRef = {
        socket: socket,
    };

    // adds a user bases on the their reference
    users.add(userRef);
    
    // for sending messages out with helper function sendMessage
   
    // The WS event listeners
    socket.on('message', (msg) => {
        // 1. When a message is received...
        try {
            console.log(msg)
            // 2. ...attempt to parse it 
            const parsedMsg = JSON.parse(msg)
            // 3. then ensure that it is a valid message,
            if (typeof parsedMsg.sender !== 'string' || 
                typeof parsedMsg.body !== 'string') {
                console.error('Invalid message received!', msg)
                return;
            }
            // 4. and if it is, send it!
            const verifiedMsg = {
                sender : parsedMsg.sender,
                body: parsedMsg.body,
                sentAt: Date.now(),
            }
            sendMessage(verifiedMsg);
        }
        catch (err) {
            // 1b. If the message wasn't valid JSON, 
            // JSON.parse would throw an error, which we catch here
            console.error('Error parsing message', err)
        }
    });

    // self-explanatory
    socket.on('close', (code, reason) => {
        console.log(`User disconnected with code ${code} and reason ${reason}`);
        users.delete(userRef)
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

const port = 8081;
const ipAddress = '192.168.86.255';
app.listen(port, () => {
    console.log(`Beep Boop: Listening on ${ipAddress}:${port}`);
});


