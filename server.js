const express = require("express");
const bodyParser = require("body-parser");

const { initializeSeats, getAllSeats } = require("./seatModel");
const { bookTicket } = require("./bookingController");

const app = express();

app.use(bodyParser.json());

initializeSeats(20);

app.get("/", (req, res) => {
    res.send("Ticket Booking System Running");
});

app.get("/seats", (req, res) => {
    res.json(getAllSeats());
});

app.post("/book/:id", bookTicket);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
