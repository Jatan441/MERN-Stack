import slugify from "slugify";
import CategoryModel from "../Models/CategoryModel.js";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in category",
      error,
    });
  }
};

// update category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

// get all category
const categoryController = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).send({
      success: true,
      message: "All categories list",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories",
      error,
    });
  }
};

// get single category controller
const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};

// delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

export {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
