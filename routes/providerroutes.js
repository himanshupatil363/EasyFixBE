const router = require("express").Router();
const provider = require("../models/provider"); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
const { name, emailId, pwd, photo, city ,status ,joinedAt} = req.body;


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
const existingprovider = await provider.findOne({
    emailId: emailId
});
if (existingprovider)
            return res.status(400).json({
                msg: "An account with this email is already exist."
            });

        const salt = await bcrypt.genSalt();
        const hashedpwd = await bcrypt.hash(pwd, salt);
        const newPost = new provider({
            name, emailId,  pwd: hashedpwd, photo, city, status, joinedAt
        });
try{
    const savePost = await newPost.save();
    console.log(savePost)
}
catch(err)
{
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

        const providernew = await provider.findOne({
            emailId: emailId
        });
        if (!providernew)
            return res.status(400).json({
                msg: "No account with this email has been registered."
            });

        const isMatch = await bcrypt.compare(pwd, providernew.pwd);

        if (!isMatch)
            return res.status(400).json({
                msg: "Invalid credentials."
            });


        const token = jwt.sign({
            id: providernew._id
        }, process.env.JWT_SECRET);
        res.json({
            token,
            providernew: {
                id: providernew._id,
                name: providernew.name,
                emailId: providernew.emailId,
            }

        });

    } catch (err) {
        console.error(err);
    }

});




router.get("/all", async (req, res) => {
    try{
        const seeProvider = await provider.find();
        res.json(seeProvider)
    }
    catch(err)
    {
       res.json({ message :err});
    }
    });
module.exports = router;