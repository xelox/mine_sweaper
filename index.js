const express = require("express")
const app = express();
const port = 80;
const path = require('path');


app.set('view engine', 'ejs');

app.get('/', (req, res) => 
{
    res.render('main');
})

app.get('/public/:file', (req, res)=>
{
    res.sendFile(path.join(__dirname, 'public', `${req.params.file}`));
});

app.get('/favicon.ico', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'public', `favicon.ico`));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})