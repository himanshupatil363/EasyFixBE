const router = require("express").Router();
const Post = require("../models/user"); 

router.post("/", async (req, res) => {
const { name, emailid, pwd, photo, city} = req.body;

const newPost = new Post({
    name, emailid, pwd, photo, city
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