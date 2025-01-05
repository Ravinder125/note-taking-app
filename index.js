const express = require('express');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// Port
const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.render('index')
})



app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})
