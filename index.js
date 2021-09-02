const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs'
})

app.engine('hbs', hbs.engine); // регистрация движка hbs
app.set('view engine', 'hbs'); // начала использования hbs
app.set('views', 'views'); // обозначаем где находятся наши шаблоны

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
   res.render('index');
})

app.listen(PORT, () => {
    console.log("port is run", PORT);
})