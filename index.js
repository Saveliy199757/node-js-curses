const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs'
}); // инициализация hbs

app.engine('hbs', hbs.engine); // регистрация движка hbs
app.set('view engine', 'hbs'); // начала использования hbs
app.set('views', 'views'); // обозначаем где находятся наши шаблоны

app.use(express.static('public')); // говорим приложению где находиться пользовпт. скриты и стили

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
   res.render('index');
})
app.get('/add', (req, res) => {
    res.render('add', {
        title: "Добавить курс",
        isAdd: true
    });
})
app.get('/courses', (req, res) => {
    res.render('courses', {
        title: "Курсы js",
        isCourses: true
    });
})

app.listen(PORT, () => {
    console.log("port is run", PORT);
})