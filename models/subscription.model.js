import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 255,
    },
    price:{
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be between greater than 0 and']
    },
    currency:{
        type: String,
        enum: ['USD', 'EUR', 'ZAR', 'MZN'],
        default: 'MZN',
    },
    frequency:{
        type: String, 
        enum: ['daily','weekly','monthly', 'yearly'],
        default: 'monthly',
    },
    category:{
        type: String,
        enum: ["entertainment", "lifestyle", "news", "education", "fitness", "gaming", "security", "business", "finance", "food", "health", "tech", "sports", "design","other"],
        required: [true, 'Subscription category is required']
    },
    paymentMethod:{
        type: String,
        required: [true, 'Subscription payment method is required'],
        trim: true,
    },
    status:{
        type: String,
        enum: ['active', 'expired', 'cancelled', 'suspended'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: true,
        validade: {
            validator: (value) => value <=  new Date(),
            message: 'Start date must be in the past',
        },
    },
    renewalDate:{
        type: Date,
        validate: {
            validator:function (value){
                return value > this.startDate
            },
            message: 'Renewal date must be in the future, after dthe start date',
        },
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
    
},{timestamps: true})

subscriptionSchema.pre('save', function(){
    if(!this.renewalDate){
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate() + renewalPeriod[this.frequency])
    }

    // Auto-update the subscription status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }
    
    next()
})