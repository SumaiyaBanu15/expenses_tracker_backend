import incomeModel from "../models/incomeModel.js";

// Get all Income
const getIncome = async(req,res) => {
  try {
    const allIncome = await incomeModel.find();
    res.status(200).send({
        message: "All Income fetched Successfully",
        count: allIncome.length,
        allIncome
    })
  } catch (error) {
    res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      }); 
  }
}

// Add Income
const addIncome = async (req, res) => {
//   console.log(req.body);
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

    // Check if a similar income already exists
    const existingIncome = await incomeModel.findOne({
        title,
        category,
        description,
        date
    });

    if(existingIncome){
        return res.status(400).send({
            message: "Income record already exists",
        })
    }

    // Create a new Income record
    await incomeModel.create({
        title,
        amount,
        category,
        date,
        description,
    });

    res.status(201).send({
        message: "Income Added Successfully",
    });

  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Income

const deleteIncome = async(req,res) => {
    try {
        const { id } = req.params;
        // Check if the ID is provided

        if(!id) {
            return res.status(400).send({
                message: "Income Id is required",
            })
        }
        // Find and delete the income record by ID
        const deletedIncome = await incomeModel.findByIdAndDelete(id);

        // If income record not found
        if(!deletedIncome){
            return res.status(404).send({
                message: "Income record not found",
            })
        }

        // If income record deleted successfully
        res.status(200).send({
            message: "Income record deleted successfully",
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}


// Edit Income
const editIncome = async(req,res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, date, description } = req.body;

        // Validate the ID
        if(!id){
            return res.status(400).send({
                message: "Income ID is required",
            })
        }

        const updatedIncome = await incomeModel.findByIdAndUpdate(
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
        if(!updatedIncome){
            return res.status(404).send({
                message: "Income record not found",
            })
        }

        res.status(200).send({
            message: "Income record updated successfully",
            data: updatedIncome,
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

export default { 
    getIncome,
    addIncome,
    deleteIncome,
    editIncome
};
