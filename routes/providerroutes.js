const router = require("express").Router();
const provider = require("../models/provider"); 

router.post("/register", async (req, res) => {
const { name, emailid, pwd, photo, city,subcategoryid,specilization,status} = req.body;

const newPost = new provider({
    name, emailid, pwd, photo, city,subcategoryid,specilization,status
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