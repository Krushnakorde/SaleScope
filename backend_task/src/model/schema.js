import mongoose from "mongoose"

const productTransactionSchema = new mongoose.Schema({
  title:{
    type: String
},
  description:{
    type: String
},
  price:{
    type: String
},
  dateOfSale:{
    type: Date
},
  category:{
    type: String
},
  sold:{
    type: Boolean
},
  image:{
    type:String
}
},{timestamps:true});

const ProductTransactionModel = mongoose.model('ProductTransaction', productTransactionSchema);

export default ProductTransactionModel;
