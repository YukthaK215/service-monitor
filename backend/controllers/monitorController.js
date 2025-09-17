const axios = require('axios');
const db = require('../config/db');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'youremail@gmail.com', pass: 'yourapppassword' }
});
exports.addService = async (req, res) => {
  const { name, url } = req.body;
  await db.query('INSERT INTO services (name, url) VALUES (?, ?)', [name, url]);
  res.json({ message: 'Service added' });
};
exports.getServices = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM services');
  res.json(rows);
};
exports.checkStatus = async (req, res) => {
  const [services] = await db.query('SELECT * FROM services');
  const results = [];
  for (let service of services) {
    try {
      const response = await axios.get(service.url);
      const status = response.status === 200 ? 'UP' : 'DOWN';
      results.push({ name: service.name, url: service.url, status });
      if (status === 'DOWN') {
        await transporter.sendMail({
          from: 'youremail@gmail.com',
          to: 'alertrecipient@gmail.com',
          subject: `${service.name} is DOWN!`,
          text: `Service ${service.name} at ${service.url} is down!`
        });
      }
    } catch (err) {
      results.push({ name: service.name, url: service.url, status: 'DOWN' });
    }
  }
  res.json(results);
};