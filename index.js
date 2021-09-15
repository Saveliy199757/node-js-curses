const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');
const orderRoutes = require('./routes/order');
const mainRoutes = require('./routes/home');
const User = require('./models/user');


const app = express();

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}); // инициализация hbs

app.engine('hbs', hbs.engine); // регистрация движка hbs
app.set('view engine', 'hbs'); // начала использования hbs
app.set('views', 'views'); // обозначаем где находятся наши шаблоны

app.use( async (req, res, next) => {
   try {
       const user = await User.findById('613cab19a1e1aae2cecc80a7');
       req.user = user;
       next();

   } catch (e) {
       console.log('error:', e)
   }
});

app.use(express.static(path.join(__dirname, "public"))); // говорим приложению где находиться пользовпт. скриты и стили

app.use(express.urlencoded({ extended: true }))

app.use('/', mainRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;


async function start () {
    try {
        const url = "mongodb+srv://leomanking:veczvecz@cluster0.imaut.mongodb.net/shop";
        await mongoose.connect(url, {
            useNewUrlParser: true
        });

        const candidate = await User.findOne();

        if (!candidate) {
            const user = new User({
                name: 'Saveliy',
                email: 'sav@gmail.com',
                cart: { items: [] }
            });

           await user.save();
        }

        app.listen(PORT, () => {
            console.log("port is run", PORT);
        })
    } catch (e) {
        console.log("error:",e);
    }
}

start()
