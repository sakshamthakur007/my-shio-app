const router = require('express').Router()
const categoryCtrl = require('../contollers/categoryCtrl');
const CategoryCtrl =  require('../contollers/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
router.get("/category",categoryCtrl.getCategories);
router.post("/category",auth,authAdmin,categoryCtrl.createCategory);
router.delete("/category/:id",auth,authAdmin,categoryCtrl.deleteCategory);
router.put('/category/:id',auth,authAdmin,categoryCtrl.updateCategory);
module.exports = router