const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const Joi=require('joi')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.text());


//validation herr
const bookingSchema = Joi.object({
    employeeName: Joi.string().min(3).max(30).required(),
    bookingDate: Joi.date().iso().required(),
    startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    roomNumber: Joi.string().valid('101', '102', '103').required(),
    additionalNotes: Joi.string().max(500).optional()
  });
app.post("/booking", (req, res) => {
  const value=req.body;
  axios
    .post('http://localhost:3000/bookRoom', value)
    .then((response) => {
        res.json({ success: true, data: response.data });
    })
    .catch((error) => {
        res.status(500).json({ success: false, message: 'An error occurred while submitting the booking', error: error.message });
    });
 
});

app.post("/bookRoom", (req, res) => {
    const { error, value } = bookingSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: 'Validation error', details: error.details });
    }
    return res.status(200).json({ success: true, data:'Success'})
  }
);
app.listen(port, () => console.log("lsitening on port " + port));
