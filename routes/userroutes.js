const router = require("express").Router();
const user = require("../models/user"); 
const payment = require("../models/payment");
const recievedorder = require("../models/recievedorder");
const reciept = require("../models/reciept");
const systemfeedback = require("../models/systemfeedback");
const servicefeedback = require("../models/servicefeedback");
const complain = require("../models/complain");


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
        const { userid ,providerid,subcategoryid,address,cityid,datetime,status } = req.body;
        
        const newUser = new recievedorder({
            userid ,providerid,subcategoryid,address,cityid,datetime,status
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
        router.post("/reciept", async (req, res) => {
            const { orderid} = req.body;
            
            const newUser = new reciept({
                orderid
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
        router.post("/systemfeedback", async (req, res) => {
                const { username,emailid,message } = req.body;
                
                const newUser = new systemfeedback({
                    username,emailid,message
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
                router.post("/servicefeedback", async (req, res) => {
                    const { userid,subject,message,subcategoryid,datetime } = req.body;
                    
                    const newUser = new servicefeedback({
                        userid,subject,message,subcategoryid,datetime
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
                    router.post("/complain", async (req, res) => {
                        const { userid,subject,message,subcategoryid,datetime } = req.body;
                        
                        const newUser = new complain({
                            userid,subject,message,subcategoryid,datetime
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