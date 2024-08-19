import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();

router.post('/addcategory', CategoryController.addCategory)
router.get('/getcategory', CategoryController.getCategory)

export default router