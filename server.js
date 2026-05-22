const connectDB = require("./config/db");
const mongoose = require("mongoose");
var cors = require('cors')
const corsOptions = require('./config/cors')
const express = require("express")
const app = express()
const logger = require('./middleware/logger')
const Blog = require('./models/blog')
const cookieParser = require('cookie-parser');
const verifyJwt = require('./middleware/verifyJwt')
//const credentials = require("./middleware/credentials")

connectDB();
//app.use(credentials);
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(cookieParser());




//Public Routes
const authRoutes = require('./routes/authRoutes');
app.use('/register', authRoutes);
const userRoutes = require('./routes/loginRoutes');
app.use('/login', userRoutes);
const refreshRoutes = require('./routes/refreshRoute');
app.use('/refresh', refreshRoutes);
const logoutRoutes = require('./routes/logoutRoute');
app.use('/logout', logoutRoutes);
//Protected Routes
app.use(verifyJwt);
const blogRoutes = require('./routes/blogRoutes');
app.use('/blogs', blogRoutes); 


mongoose.connection.once('open', ()=>{
  app.listen(5000,()=>console.log('App Connected'))
})




