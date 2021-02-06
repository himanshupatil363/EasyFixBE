const provider = require("../models/Provider");
exports.getPrivateData = async (req, res, next) => {
        const currentProvider = await provider.findById(req.provider);
        res.status(200).json({
            success: true,
            data: currentProvider,
        });
};