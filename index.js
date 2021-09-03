const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const mainRoutes = require('./routes/home')

const app = express();

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs'
}); // инициализация hbs

app.engine('hbs', hbs.engine); // регистрация движка hbs
app.set('view engine', 'hbs'); // начала использования hbs
app.set('views', 'views'); // обозначаем где находятся наши шаблоны

app.use(express.static('public')); // говорим приложению где находиться пользовпт. скриты и стили

app.use(express.urlencoded({ extended: true }))

app.use('/', mainRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("port is run", PORT);
})