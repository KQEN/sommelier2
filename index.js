import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/add-wine', async (req, res) => {
  const data = req.body;

  const response = await axios.post(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
    { fields: data },
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  res.json({ success: true, airtableResponse: response.data });
});

app.listen(3000, () => console.log('Server runs on port 3000'));