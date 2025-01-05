const express = require('express');
const app = express();


app.set('view engine', 'ejs');

// Port
const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send('Hello World');
})



app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})
