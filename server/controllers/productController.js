import {v2 as cloudinary} from "cloudinary"
import Product from "../models/Product.js"
//Add Product : /api/product/add

export const addProduct = async (req,res) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imageUrl = await Promise.all (
            images.map(async(items)=>{
                let result = await cloudinary.uploader.upload(items.path,
                    {resource_type: 'image'}
                    
                );
                return result.secure_url
            })
        )

        await Product.create({...productData, image:imageUrl})

        res.json({success:true, message: "Product Added"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }

}

//Get Product : /api/product/list

export const productList = async (req,res) => {
    
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//Get Single Product : /api/product/id

export const productById = async (req,res) => {

    try {
        const {id} = req.body
        const product = await Product.findById(id)
        res.json({success:true, product})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
    
    
}

//Change Product : /api/product/stock

export const changeStock = async (req,res) => {
    
    try {
        const {id, inStock} = req.body
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success:true,message: "Stock Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}
