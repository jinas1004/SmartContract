const express = require('express');
const index = require('./index');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/test", index.test);

app.listen(port, () => {
    console.log(`
    ###################################
    ##  Contract Test on port: ${port}  ##
    ###################################`);
});