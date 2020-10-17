const express = require('express');
const app = express();
require("dotenv").config();

app.get('/', (req, res) => {  
	res.json('{message: Hello Heroku! This should be deployed}')
})


app.listen(process.env.PORT, ()=> {
	console.log(process.env);
	console.log("server running on port 4000")
})