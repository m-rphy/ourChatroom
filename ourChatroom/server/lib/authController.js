const bcrypt = require('bcryptjs');

 
const users = [
    { username: 'billy', password: '123' },
    { username: 'alice', passwordHash: '$2b$10$A3NqSThMqV7X9KZ8IFV7Y.L0r5Uc7mUaW8EaJcbmzH0QJdX9/QgZi' }, // Password: 'password'
    { username: 'bob', passwordHash: '$2b$10$EWhG9cnlJFqNC3/oP3oOg.lTglwJd2I70HtRoxzHXOv9XZ1M04sLa' }, // Password: 'password123'
  ];

authController = {}

authController.isValid = (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body)
    console.log(username)
    console.log(password)
    const user = users.find((u) => u.username === username);
    if (!user) {
        res.send(JSON.stringify({ isAuthenticated: false }));
        return;
    }

    // bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
    //     if (err || !isMatch) {
    //         socket.send(JSON.stringify({ isAuthenticated: false }));
    //         return;
    //     }

    if (user && user.password === password){
        res.locals.username = username;
        res.locals.isValid = true;
        return next();
    }
    // });
}

 authController.addUser = (res, req, next) => {
    const { username, password } = req.body;
    const newUser = {username, password}
    users.push(newUser);
    res.locals.newUser = newUser.username;
    next()
 }

// EXPORT THE CONTROLLER
module.exports = authController;
