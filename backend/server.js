import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import voiceRouter from "./routes/voiceRoute.js";


// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()



// middlewares
app.use(express.json())
import cors from 'cors';

const allowedOrigins = [
  'https://agrinext-frontend-abhay-hastars-projects.vercel.app',
  'https://agrinext-admin.vercel.app',
];

// CORS options object
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // if you use cookies or auth headers
  optionsSuccessStatus: 200 // some legacy browsers choke on 204
};

// Apply CORS middleware to all requests
app.use(cors(corsOptions));

// To explicitly handle preflight requests
app.options('*', cors(corsOptions));



// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use("/api/voice", voiceRouter);

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))