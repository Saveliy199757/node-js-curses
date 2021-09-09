const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
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

app.use(express.static(path.join(__dirname, "public"))); // говорим приложению где находиться пользовпт. скриты и стили

app.use(express.urlencoded({ extended: true }))

app.use('/', mainRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;


async function start () {
    try {
        const url = "mongodb+srv://leomanking:veczvecz@cluster0.imaut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        await mongoose.connect(url, { useNewUrlParser: true });

        app.listen(PORT, () => {
            console.log("port is run", PORT);
        })
    } catch (e) {
        console.log("error:",e);
    }
}

start()
