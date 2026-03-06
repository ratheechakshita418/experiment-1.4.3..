const redisClient = require("./redisClient");
const { getSeat, bookSeat } = require("./seatModel");
const { v4: uuidv4 } = require("uuid");

const LOCK_TIMEOUT = 5000;

async function bookTicket(req, res) {

    const seatId = req.params.id;
    const lockKey = `lock:seat:${seatId}`;
    const lockValue = uuidv4();

    try {

        const lock = await redisClient.set(lockKey, lockValue, {
            NX: true,
            PX: LOCK_TIMEOUT
        });

        if (!lock) {
            return res.json({
                success: false,
                message: "Seat is currently being booked by someone else"
            });
        }

        const seat = getSeat(seatId);

        if (!seat) {
            return res.json({
                success: false,
                message: "Seat not found"
            });
        }

        if (seat.booked) {
            return res.json({
                success: false,
                message: "Seat already booked"
            });
        }

        const booked = bookSeat(seatId);

        await redisClient.del(lockKey);

        if (booked) {
            return res.json({
                success: true,
                message: `Seat ${seatId} booked successfully`
            });
        }

        res.json({
            success: false,
            message: "Booking failed"
        });

    } catch (error) {

        await redisClient.del(lockKey);

        res.json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    bookTicket
};
