const router = require("express").Router();
const Providerinsert = require("../models/provider");
const Category = require("../models/category"); 

router.post("/", async (req, res) => {
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
router.post("/category", async (req, res) => {
    const { categoryname, categoryphoto} = req.body;
    
    const newPost = new Category({
        categoryname, categoryphoto
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