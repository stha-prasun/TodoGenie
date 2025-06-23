import { Todo } from "../models/todoSchema.js";
import { User } from "../models/userSchema.js";

export const addTodo = async (req, res)=>{
    try {
        const {title, description, id} = req.body;

        if(!title || !description || !id){
            return res.status(400).json({
                success: false,
                message: "Fields cannot be left empty"
            });
        }

        const newTodo = new Todo({
      title,
      description,
      user: id,
    });

    await newTodo.save();

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.todo.push(newTodo._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Todo added successfully."
    });

    } catch (error) {
        console.log(error);
    }
}