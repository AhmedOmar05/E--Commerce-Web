const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        // Check permission
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            throw new Error("No files uploaded");
        }

        // Extract file paths for all uploaded images and construct URLs
     //    const productImages = req.files.map(file => ({
        //     filePath: file.path,
       //      url:    `${process.env.BACKEND_URL}/uploads/${file.filename}`  // Construct the URL using the server's base URL and the uploaded file's filename

        //     fileName: file.originalname,
         //}));
      const productImages = req.files.map(file=>"uploads/"+file.filename);


        // Create a new product entry with the uploaded file information
        const productData = {
            ...req.body,
            productImage:  productImages// image  name  with URLs
        };

        const uploadProduct = new productModel(productData);
        const saveProduct = await uploadProduct.save();

        // Respond with success
        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct,
            images: productImages,  // Send back the image URLs in the response
        });
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = UploadProductController;
