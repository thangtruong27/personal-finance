const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('build'));

app.use("*",(req, res) => {
    res.send("<h1>Hello</h1>");
});

app.listen(PORT,() => console.log(`Hosting port on ${PORT}`));
