import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        city:{
            type:String,
            required: true
        },
        country: String,
        state: String,
        zipecode: Number
    },
    productId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        }
    ],
    totalPrice:{
        type: Number,
        required: true
    }
},{
    timestamps: true
})
const Order = mongoose.model('Order', orderSchema);
export default Order;