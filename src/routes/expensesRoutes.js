import express from 'express'
import ExpensesController from '../controllers/expensesController.js'

const router = express.Router();

router.post('/addexpenses', ExpensesController.addExpenses);
router.get('/getexpenses', ExpensesController.getExpenses);
router.delete('/deleteexpenses/:id', ExpensesController.deleteExpenses);
router.put('/editexpenses/:id', ExpensesController.editExpenses);

export default router