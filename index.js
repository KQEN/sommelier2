import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post('/add-wine', async (req, res) => {
  const data = req.body;

//   console.log('DATA:', data);

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

app.get('/list-wines', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        }
      }
    );

    const records = response.data.records.map(record => ({
      id: record.id,
      ...record.fields
    }));

    res.json({ success: true, records });
  } catch (error) {
    console.error('Airtable error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(PORT, () => console.log(`Server draait op poort ${PORT}`));
