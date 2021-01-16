const router = require("express").Router();
const Providerinsert = require("../models/provider");

router.post("/register", async (req, res) => {
const { name, emailid, pwd, photo, city,subcategoryid,specilization,status} = req.body;

const newPost = new Providerinsert({
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
module.exports = router;