const router = require("express").Router();
const user = require("../models/user"); 

router.post("/register", async (req, res) => {
const { name, emailid, pwd, city } = req.body;

const newUser = new user({
    name, emailid, pwd ,city
});
try{
    const saveUser = await newUser.save();
    console.log(saveUser)
}
catch(err)
{
   console.error(err);
}
});

router.get("/all", async (req, res) => {
    try{
        const seeUsers = await user.find();
        res.json(seeUsers)
    }
    catch(err)
    {
       res.json({ message :err});
    }
    });


module.exports = router;