const router = require("express").Router();
const user = require("../models/user"); 
const payment = require("../models/payment");
const recievedorder = require("../models/recievedorder");

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
router.post("/payment", async (req, res) => {
    const { orderid,userid,paymentamt,subcategoryid } = req.body;
    
    const newUser = new payment({
        orderid,userid,paymentamt,subcategoryid
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

    router.post("/recievedorder", async (req, res) => {
        const { userid ,address,city,datetime,subcategoryid,status } = req.body;
        
        const newUser = new recievedorder({
            userid ,address,city,datetime,subcategoryid,status
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