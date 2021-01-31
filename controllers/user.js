const Feedback = require('../models/Feedback');
exports.feedback = async (req, res, next) => {
    const {
        name,
        email,
        msg
    } = req.body;
    try {
        const feedback = await Feedback.create({
            name,
            email,
            msg
        });
        sendToken(feedback, 201, res);
    } catch (error) {
       next(error);
    }
};
const  sendToken = (feedback ,statusCode, res) => {
    res.status(statusCode).json({success:true, feedback})
}
