const router = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");
const user = require("../models/user");
const payment = require("../models/payment");
const recievedorder = require("../models/recievedorder");
const reciept = require("../models/reciept");
const systemfeedback = require("../models/systemfeedback");
const servicefeedback = require("../models/servicefeedback");
const complain = require("../models/complain");


router.post("/register", async (req, res) => {
    try {
        const {
            name,
            emailId,
            pwd,
            photo,
            city,
            joinedAt
        } = req.body;
        if (!emailId || !pwd) {
            return res.status(400).json({
                msg: "Not all fields have been altered."
            });
        }
        if (pwd.length < 6) {
            return res.status(400).json({
                msg: "The password should be more than 6 characters"
            });
        }

        const existinguser = await user.findOne({
            emailId: emailId
        });
        if (existinguser)
            return res.status(400).json({
                msg: "An account with this email is already exist."
            });

        if (!name)
            return res.status(400).json({
                msg: "Name should not be empty"
            });

        const salt = await bcrypt.genSalt();
        const hashedpwd = await bcrypt.hash(pwd, salt);

        // console.log(hashedpwd);
        const newUser = new user({
            name,
            emailId,
            pwd: hashedpwd,
            photo,
            city,
            joinedAt
        });
        const saveUser = await newUser.save();
        res.json(saveUser);
        //console.log(saveUser)
    } catch (err) {
        console.error(err);
    }
});


router.post("/login", async (req, res) => {
    try {
        const {
            emailId,
            pwd
        } = req.body;

        if (!emailId || !pwd) {
            return res.status(400).json({
                msg: "Not all fields have been altered."
            });
        }

        const User = await user.findOne({
            emailId: emailId
        });
        if (!User)
            return res.status(400).json({
                msg: "No account with this email has been registered."
            });

        const isMatch = await bcrypt.compare(pwd, User.pwd);

        if (!isMatch)
            return res.status(400).json({
                msg: "Invalid credentials."
            });


        const token = jwt.sign({
            id: User._id
        }, process.env.JWT_SECRET);
        res.json({
            token,
            User: {
                id: User._id,
                name: User.name,
                emailId: User.emailId,
            }

        });

    } catch (err) {
        console.error(err);
    }

});


router.delete("/delete", auth, async (req, res) => {
    try {
        //  console.log(req.User);
        const deletedUser = await user.findByIdAndDelete(req.userd);
        res.json(deletedUser);
    } catch (err) {
        console.error(err);
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);


        const User = await user.findById(verified.id);
        if (!User) return res.json(false);

        return res.json(true);
    } catch (err) {
        console.error(err);
    }
});

router.post("/payment", async (req, res) => {
    const {
        orderid,
        userid,
        paymentamt,
        subcategoryid
    } = req.body;

    const newUser = new payment({
        orderid,
        userid,
        paymentamt,
        subcategoryid
    });
    try {
        const saveUser = await newUser.save();
        console.log(saveUser)
    } catch (err) {
        console.error(err);
    }
});

router.post("/recievedorder", async (req, res) => {
    const {
        userid,
        providerid,
        subcategoryid,
        address,
        cityid,
        datetime,
        status
    } = req.body;

    const newUser = new recievedorder({
        userid,
        providerid,
        subcategoryid,
        address,
        cityid,
        datetime,
        status
    });
    try {
        const saveUser = await newUser.save();
        console.log(saveUser)
    } catch (err) {
        console.error(err);
    }
});
router.post("/reciept", async (req, res) => {
    const {
        orderid
    } = req.body;

    const newUser = new reciept({
        orderid
    });
    try {
        const saveUser = await newUser.save();
        console.log(saveUser)
    } catch (err) {
        console.error(err);
    }
});
router.post("/systemfeedback", async (req, res) => {
    const {
        username,
        emailId,
        message
    } = req.body;

    const newUser = new systemfeedback({
        username,
        emailId,
        message
    });
    try {
        const saveUser = await newUser.save();
        console.log(saveUser)
    } catch (err) {
        console.error(err);
    }
});
router.post("/servicefeedback", async (req, res) => {
    const {
        userid,
        subject,
        message,
        subcategoryid,
        datetime
    } = req.body;

    const newUser = new servicefeedback({
        userid,
        subject,
        message,
        subcategoryid,
        datetime
    });
    try {
        const saveUser = await newUser.save();
        console.log(saveUser)
    } catch (err) {
        console.error(err);
    }
});
router.post("/complain", async (req, res) => {
    const {
        userid,
        subject,
        message,
        subcategoryid,
        datetime
    } = req.body;

    const newUser = new complain({
        userid,
        subject,
        message,
        subcategoryid,
        datetime
    });
    try {
        const saveUser = await newUser.save();
        console.log(saveUser)
    } catch (err) {
        console.error(err);
    }
});
router.get("/",auth ,async(req,res) =>{
    const user =await User.findById(req.user);
    res.json(user);
});
router.get("/all", async (req, res) => {
    try {
        const seeUsers = await user.find();
        res.json(seeUsers)
    } catch (err) {
        res.json({
            message: err
        });
    }
});


module.exports = router;