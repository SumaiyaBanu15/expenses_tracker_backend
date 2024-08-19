import mongoose from "./index.js";

const categorySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true}
},{
    versionKey: false
});

const categoryModel = mongoose.model('categories', categorySchema);
export default categoryModel
