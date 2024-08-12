const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const moment = require('moment');
const { Client } = require('pg');

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

        // useEffect(() => {
        //     if (endTime) {
        //         const intervalId = setInterval(() => {
        //             const now = moment();
        //             const end = moment(endTime);
        //             const diff = end.diff(now);
        
        //             if (diff > 0) {
        //                 const duration = moment.duration(diff);
        //                 const days = Math.floor(duration.asDays());
        //                 const hours = duration.hours();
        //                 const minutes = duration.minutes();
        //                 const seconds = duration.seconds();
        
        //                 setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        //             } else {
        //                 setTimeLeft("00d 00h 00m 00s");
        //             }
        //         }, 1000);
        
        //         return () => clearInterval(intervalId);
        //     }
        // }, [endTime]);
        



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
    const { description, timer, link } = req.body;
    let updateFields = [];
    let updateValues = [];

    if (description) {
        updateFields.push('description = $' + (updateFields.length + 1));
        updateValues.push(description);
    }

    if (timer) {
        updateFields.push('timer = $' + (updateFields.length + 1));
        updateValues.push(timer);
    }

    if (link) {
        updateFields.push('link = $' + (updateFields.length + 1));
        updateValues.push(link);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields provided for update.' });
    }

    const bannerId = '994149630623383553'; // ID is now a string
    updateValues.push(bannerId);

    const query = `UPDATE banners SET ${updateFields.join(', ')} WHERE id = $${updateValues.length}`;

    try {
        await client.query(query, updateValues);
        res.json({ success: true, message: 'Banner updated successfully.' });
    } catch (err) {
        console.log(err);
        console.error('Error updating banner data:', err);
        res.status(500).json({ error: 'An error occurred while updating banner data.' });
    }
});





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});