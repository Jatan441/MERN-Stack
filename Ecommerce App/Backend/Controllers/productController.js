import slugify from "slugify";
import ProductModel from "../Models/ProductModel.js";
import fs from "fs";

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ message: " Name is required" });
      case !description:
        return res.status(500).send({ message: " Description is required" });
      case !price:
        return res.status(500).send({ message: " Price is required" });
      case !category:
        return res.status(500).send({ message: " Category is required" });
      case !quantity:
        return res.status(500).send({ message: " Quantity is required" });
      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ message: " Photo is required and should be less then 1mb" });
    }

    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product has created",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

// get all product
const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

// get single product

const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single products",
      error,
    });
  }
};

// get product photo
const ProductPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting product photo",
      error,
    });
  }
};

// delete product
const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-product");
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ message: " Name is required" });
      case !description:
        return res.status(500).send({ message: " Description is required" });
      case !price:
        return res.status(500).send({ message: " Price is required" });
      case !category:
        return res.status(500).send({ message: " Category is required" });
      case !quantity:
        return res.status(500).send({ message: " Quantity is required" });
      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ message: " Phot is required and should be less then 1mb" });
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

export {
  createProductController,
  getProductController,
  getSingleProductController,
  ProductPhotoController,
  deleteProductController,
  updateProductController,
};
