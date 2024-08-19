import expensesModel from "../models/expensesModel.js";

// Get All Expenses
const getExpenses = async(req,res) => {
    try {
        const allExpenses = await expensesModel.find();
    res.status(200).send({
        message: "All Expenses fetched Successfully",
        count: allExpenses.length,
        allExpenses
    })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
          }); 
    }
}

const addExpenses = async(req,res) => {
    // console.log(req.body);

    try {
        const { title, amount, category, date, description } = req.body;

        // Validate required fields
    if (!title || !category || !description || !date) {
        return res.status(400).send({
          message: "All fields are required",
        });
      }
  
      // check if amount is a positive number
      if (amount <= 0 || typeof amount !== "number") {
        return res.status(400).send({
          message: "Amount must be a positive number",
        });
      }
      // Check if a similar expenses already exists
      const existingExpenses = await expensesModel.findOne({
        title,
        category,
        date,
        description
    });
    if(existingExpenses){
        return res.status(400).send({
            message: "Expenses record already exists",
        })
    }

    // Create a new Expenses record
    await expensesModel.create({
        title,
        amount,
        category,
        date,
        description,
    })
    res.status(201).send({
        message: "Expenses Added Successfully",
    });


    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteExpenses = async(req,res) => {
try {
    const { id } = req.params;
        // Check if the ID is provided

        if(!id) {
            return res.status(400).send({
                message: "Expense Id is required",
            })
        }
        // Find and delete the expenses record by ID
        const deletedExpenses = await expensesModel.findByIdAndDelete(id);

        // If Expenses record not found
        if(!deletedExpenses){
            return res.status(404).send({
                message: "Expense record not found",
            })
        }

        // If expenses record deleted successfully
        res.status(200).send({
            message: "Expense record deleted successfully",
        });    

} catch (error) {
    res.status(500).send({
        message: "Internal Server Error",
        error: error.message
    })
}
}

const editExpenses = async(req,res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, date, description } = req.body;

        // Validate the ID
        if(!id){
            return res.status(400).send({
                message: "Expenses ID is required",
            })
        }

        const updatedExpenses = await expensesModel.findByIdAndUpdate(
            id,
            {
                title,
                amount,
                category,
                date,
                description
            },{
                new: true
            }
        )
        if(!updatedExpenses){
            return res.status(404).send({
                message: "Expense record not found",
            })
        }

        res.status(200).send({
            message: "Expense record updated successfully",
            data: updatedExpenses,
        })

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export default {
    addExpenses,
    getExpenses,
    deleteExpenses,
    editExpenses
}