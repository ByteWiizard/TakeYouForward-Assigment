const bcrypt = require('bcryptjs');


const password = 'ShoutoutToStriver';

const saltRounds = 10;


bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});
