const Categories = require("../models/categoryModels")

const categoryCtrl = {
    getCategories : async (req,res) => {
       try {
            const categories = await Categories.find();
            res.json(categories);
       } catch (error) {
        return res.status(500).json({msg:error.message})
       }
    },
    createCategory: async (req,res) => {
        try {
            const {name} = req.body;
            const category =  await Categories.findOne({name})
            if(category) return res.status(400).json({msg:"category already exists"})
            const newCategory = new Categories({name})
            await newCategory.save();
            res.json('category created')
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteCategory: async (req,res) => {
        try {
            await Categories.findByIdAndDelete(req.params.id)
            res.json({msg:"category deleted"})
        } catch (error) {
            res.status(500).json({msg:error.message});
        }
    },
    updateCategory :async (req,res) => {
        try {
            const { name } = req.body;
            await Categories.findByIdAndUpdate({_id:req.params.id},{name})
            res.json({msg:"updated"})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    }
}


module.exports = categoryCtrl