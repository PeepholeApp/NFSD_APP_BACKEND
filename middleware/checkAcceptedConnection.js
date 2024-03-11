const ConnectionRequest = require('../models/ConnectionRequest');

const checkAcceptedConnection = async (req, res, next) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.profileId;

        const acceptedConnection = await ConnectionRequest.findOne({
            sender: senderId,
            receiver: receiverId,
            status: "accepted",
        });

        if (acceptedConnection) {
            next();
        } else {
            res.status(403).json({ success: false, message: "Connection not accepted" });
        }
    } catch (error) {
        console.error("Error checking accepted connection:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// module.exports = checkAcceptedConnection;
