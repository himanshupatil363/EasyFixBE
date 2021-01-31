const user = require("../models/User");
exports.getPrivateData = async (req, res, next) => {
        const currentUser = await user.findById(req.user);
        res.status(200).json({
            success: true,
            data: currentUser,
        });
};