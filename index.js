const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/home');
const varMiddleware = require('./middleware/variables');


const app = express();

const MONGODB_URI = "mongodb+srv://leomanking:veczvecz@cluster0.imaut.mongodb.net/shop";

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}); // инициализация hbs
const store = new MongoStore({
   collation: 'sessions',
   uri: MONGODB_URI
});

app.engine('hbs', hbs.engine); // регистрация движка hbs
app.set('view engine', 'hbs'); // начала использования hbs
app.set('views', 'views'); // обозначаем где находятся наши шаблоны

app.use(express.static(path.join(__dirname, "public"))); // говорим приложению где находиться пользовпт. скриты и стили

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
})); // init express-session

app.use(varMiddleware);

app.use('/', mainRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;


async function start () {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true
        });

        app.listen(PORT, () => {
            console.log("port is run", PORT);
        })
    } catch (e) {
        console.log("error:", e);
    }
}

start()
