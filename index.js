const express = require('express');
const app = express();


app.get('/', (req, res) => {  
	res.json('{message: Hola}')
})
app.listen(4000)