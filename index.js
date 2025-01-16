const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { render } = require('ejs');

// View Engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Port
const PORT = process.env.PORT || 3000;

// Rendering the index.ejs file
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.log(err);
            res.render('index', { files: [] }); // Render with an empty list on error
        }
        // console.log(files);
        res.render('index', { files }); // Render with file names
    });
});


// Rendering the file.ejs file
app.get('/file/:filename', (req, res) =>{
    // console.log(req.params.filename);
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, description)=>{
        if(err){
            console.log(`Error reading file${err}`)
        }
        const title = req.params.filename.split('-').join(' ').replace('.txt', '');
        const data = {title, description}
        res.render('file', {data})
    })
})


// Handling form submission
app.post('/create-task', (req, res) => {
    try {
        console.log(req.body);
        // const { taskTitle, taskDiscription } = req.body;
        // console.log(taskTitle, taskDiscription);

        // if (!taskTitle || !taskDiscription) {
        //     console.log('Please fill all the fields');
        //     return res.redirect('/'); // Redirect to the home page if validation fails
        // }

        // const filePath = `./files/${taskTitle}.txt`;

        // Write the file
        fs.writeFile(`./files/${req.body.title.split(' ').join('-')}.txt`, req.body.description, (err) => {
            if (err) {
                console.log(err);
                res.redirect('/'); // Redirect to the home page on error
            }
            res.redirect('/'); // Redirect after successful file creation
        });
    } catch (error) {
        console.log('An error occurred:', error);
        res.redirect('/'); // Redirect in case of an unexpected error
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
