import Class from "../models/class.js";

export const addClass = async (req, res) => {
    const { className, branch, year, subject } = req.body;

    try {
        const existingClass = await Class.findOne({ className, branch, year });

        if (existingClass) {
            return res.status(400).json({ message: 'Class already exists' });
        }

        const newClass = new Class({
            className,
            branch,
            year,
            subject
        });

        const savedClass = await newClass.save();

        res.status(201).json({
            message: 'Class added successfully',
            class: savedClass
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding class' });
    }
};

export const getAllClass = async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving classes' });
    }
}
