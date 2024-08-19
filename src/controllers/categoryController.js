import categoryModel from '../models/categoryModel.js'

const addCategory = async(req,res) => {
    try {
        const { user, name } = req.body;
        const newCategory = new Category({ user, name });
        await newCategory.save();
        res.json(newCategory)

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getCategory = async(req,res) => {
    try {
        const categories = await Category.find({ user: req.params.userId });
        res.json(categories);

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export default {
    addCategory,
    getCategory
}
