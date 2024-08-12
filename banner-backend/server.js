const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const moment = require('moment');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(bodyParser.json());;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(err => {
    if (err) {
        console.error('Error connecting to CockroachDB:', err);
    } else {
        console.log('Connected to CockroachDB.');
    }
});

app.get('/api/get-banner-details', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM banners LIMIT 1');
        const banner = results.rows[0];
        console.log(results.rows[0]);
        if (banner) {
            const { description, timer, link } = banner;
            res.json({ description, timer, link });
        } else {
            res.status(404).json({ error: 'No banner found' });
        }
    } catch (err) {
        console.error('Error fetching banner data:', err);
        res.status(500).json({ error: 'An error occurred while fetching banner data.' });
    }
});


app.put('/api/update-banner-details', async (req, res) => {
    const { description, timer, link, password } = req.body;
    const results = await client.query('SELECT * FROM passwords LIMIT 1');
    const OriginalPassword = results.rows[0].pass

    const isPasswordValid = await bcrypt.compare(password, OriginalPassword);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Password does not match.' });
    }
    let updateFields = [];
    let updateValues = [];

    if (description) {
        updateFields.push('description = $' + (updateFields.length + 1));
        updateValues.push(description);
    }

    if (timer) {
        const formattedTimer = moment(timer).format('YYYY-MM-DD HH:mm:ssZ');  // Ensure timer is in correct format
        updateFields.push('timer = $' + (updateFields.length + 1));
        updateValues.push(formattedTimer);
    }

    if (link) {
        updateFields.push('link = $' + (updateFields.length + 1));
        updateValues.push(link);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields provided for update.' });
    }

    const bannerId = '994172468454785025';
    updateValues.push(bannerId);

    const query = `UPDATE banners SET ${updateFields.join(', ')} WHERE id = $${updateValues.length}`;

    try {
        await client.query(query, updateValues);
        res.json({ success: true, message: 'Banner updated successfully.' });
    } catch (err) {
        console.error('Error updating banner data:', err);
        res.status(500).json({ error: 'An error occurred while updating banner data.' });
    }
});


app.put('/api/change-password', async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        
        const result = await client.query('SELECT pass FROM passwords WHERE id = 1');
        const hashedPassword = result.rows[0].pass;

       
        const isMatch = await bcrypt.compare(oldPassword, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ error: 'Old password is incorrect.' });
        }

       
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

       
        await client.query('UPDATE passwords SET pass = $1 WHERE id = 1', [newHashedPassword]);

        res.json({ success: true, message: 'Password updated successfully.' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ error: 'An error occurred while updating the password.' });
    }

})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});