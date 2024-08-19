import express from 'express'
import IncomeController from '../controllers/incomeController.js'

const router = express.Router()

router.get('/getallincome', IncomeController.getIncome)
router.post('/addincome', IncomeController.addIncome)
router.delete('/deleteincome/:id', IncomeController.deleteIncome);
router.put('/editincome/:id', IncomeController.editIncome);


export default router