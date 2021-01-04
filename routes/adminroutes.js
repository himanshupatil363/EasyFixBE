const router = require("express").Router();
const Post = require("../models/admin"); 

router.post("/", async (req, res) => {
const { name, emailid, pwd, photo} = req.body;

const newPost = new Post({
    name, emailid, pwd, photo
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