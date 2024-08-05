import express from "express";
import path from "path";
import bodyParser from "body-parser";
import userInfo from "./models/userInfo.js"
import sequelize from "./config/config.js"
import cors from "cors";
import api from "./routes/index.js"
import dotenv  from "dotenv";

dotenv.config()


const app = express();
const PORT = process.env.PORT||5000
app.use(cors());

// Or configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,POST,PUT,DELETE', // Allow specific methods
 // Allow specific headers
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api",api)
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, '../frontend/public')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
  });

  app.use((req, res) => {
    res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
  });
  
//app.use(errorHandler);

app.listen(PORT,async ()=>{
  await sequelize.authenticate();
  await sequelize.sync({alter:true});
  console.log('All models were synchronized successfully.') 
    console.log(`server is running on port ${PORT}`)
})