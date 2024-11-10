import mongoose from 'mongoose';

const goldPriceSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  metal: { type: String, required: true },
  currency: { type: String, required: true },
  exchange: { type: String, required: true },
  symbol: { type: String, required: true },
  prev_close_price: { type: Number, required: true },
  open_price: { type: Number, required: true },
  low_price: { type: Number, required: true },
  high_price: { type: Number, required: true },
  open_time: { type: Number, required: true },
  price: { type: Number, required: true },
  ch: { type: Number, required: true }, // Price change
  chp: { type: Number, required: true }, // Change in percentage
  ask: { type: Number, required: true },
  bid: { type: Number, required: true },
  price_gram_24k: { type: Number, required: true },
  price_gram_22k: { type: Number, required: true },
  price_gram_21k: { type: Number, required: true },
  price_gram_20k: { type: Number, required: true },
  price_gram_18k: { type: Number, required: true },
  price_gram_16k: { type: Number, required: true },
  price_gram_14k: { type: Number, required: true },
  price_gram_10k: { type: Number, required: true },
  date:{type:Date, required:true},
  preGSTFinalPrice:{type:Number,required:true}
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create a model from the schema
const GoldPrice = mongoose.model('GoldPrice', goldPriceSchema);

export default GoldPrice;
