const router = require("express").Router();
const Post = require("../models/admin");
const Category = require("../models/category");
const subCategory = require("../models/subcategory");
const Package = require("../models/package");
const offer = require("../models/offer");

router.post("/register", async (req, res) => {
    const {
        name,
        emailid,
        pwd
    } = req.body;

    const newPost = new Post({
        name,
        emailid,
        pwd
    });
    try {
        const savePost = await newPost.save();
        console.log(savePost)
    } catch (err) {
        console.error(err);
    }

});
router.post("/category", async (req, res) => {
    const {
        categoryname,
        categoryphoto
    } = req.body;

    const newPost = new Category({
        categoryname,
        categoryphoto
    });
    try {
        const savePost = await newPost.save();
        console.log(savePost)
    } catch (err) {
        console.error(err);
    }
});
router.post("/subcategory", async (req, res) => {
    const {
        categoryid,
        subcategoryname,
        subcategoryphoto
    } = req.body;

    const newPost = new subCategory({
        categoryid,
        subcategoryname,
        subcategoryphoto
    });
    try {
        const savePost = await newPost.save();
        console.log(savePost)
    } catch (err) {
        console.error(err);
    }
});
router.post("/package", async (req, res) => {
    const {
        packagename,
        packagephoto,
        packageprice,
        subcategoryid
    } = req.body;

    const newPost = new Package({
        packagename,
        packagephoto,
        packageprice,
        subcategoryid
    });
    try {
        const savePost = await newPost.save();
        console.log(savePost)
    } catch (err) {
        console.error(err);
    }
});
router.post("/offer", async (req, res) => {
    const {
        subcategoryid,
        per
    } = req.body;

    const newPost = new offer({
        subcategoryid,
        per
    });
    try {
        const savePost = await newPost.save();
        console.log(savePost)
    } catch (err) {
        console.error(err);
    }
});
module.exports = router;