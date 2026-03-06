const seats = {};

function initializeSeats(totalSeats = 10) {
    for (let i = 1; i <= totalSeats; i++) {
        seats[i] = {
            seatId: i,
            booked: false
        };
    }
}

function getSeat(seatId) {
    return seats[seatId];
}

function bookSeat(seatId) {
    if (seats[seatId] && !seats[seatId].booked) {
        seats[seatId].booked = true;
        return true;
    }
    return false;
}

function getAllSeats() {
    return seats;
}

module.exports = {
    initializeSeats,
    getSeat,
    bookSeat,
    getAllSeats
};
