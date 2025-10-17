import Product from "../models/Product.js";

// Place Order COD : /api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ sucess: false, message: "Invalid data" });
    }

    //calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add Tax charge (2%)

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {

    return  res.json({ success: false, message: error.message });
  }
};

//Get Orders By User Id

export const getUsersOrders = async (req,res)=> {
  
  try {
    const {userId} = req.body;
    const orders = awaits Order.find({
      userId,
      $or: [{paymentType:"COD"},{isPaid:true}]
    }).populate("")

  } catch (error) {
    
  }

}