import express from 'express'
import UserRoutes from "./userRoutes.js"
import ExpensesRoutes from './expensesRoutes.js'
import CategoryRoutes from './categoryRoutes.js'
import IncomeRoutes from './incomeRoutes.js'

const router = express.Router()

router.get('/',(req,res) => {
    res.status(200).send(`<h2> Welcome to Expenses Tracker Backend </h2>`)
})

router.use('/user', UserRoutes)
router.use('/expenses', ExpensesRoutes)
router.use('/category', CategoryRoutes)
router.use('/income', IncomeRoutes)

export default router