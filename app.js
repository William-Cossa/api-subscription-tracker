import express from 'express';

import { PORT } from './config/env.js';


import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.midleware.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json()) // allows JSON serialization to be used in request handlers
app.use(express.urlencoded({ extended: false })) // allows URL encoding to be used in request handlers, (Formdata).
app.use(cookieParser()); 

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware) // middleware for error messages when no middleware is available for the error  

app.get('/', (req, res) => {
    res.send(`welcome to the subscription app`)
});












app.listen(PORT, async() => { 
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`) 

    await connectToDatabase();
});

export default app;