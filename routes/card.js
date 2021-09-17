const { Router } = require('express');
const Courses = require('../models/courses');
const router = Router();

function mapCartItems(cart) {
    return cart.items.map(c => ({
      ...c.courseId._doc, count: c.count
    }));
}

function computePrice(course) {
    return course.reduce((total, course) => {
        return total += course.price * course.count;
    }, 0)
}

router.post('/add', async (req, res) => {
    const course = await Courses.findById(req.body.id);
    await req.user.addToCart(course);
    res.redirect("/card");
});

router.delete('/remove/:id', async (req, res) => {
    await req.user.removeFromCart(req.params.id);

    const userGet = new Promise((resolve) => {
       resolve(req.user.populate('cart.items.courseId'))
    });

    userGet.then(user => {
        const courses = mapCartItems(user.cart);

        const cart = {
            courses, price: computePrice(courses)
        }

        res.status(200).json(cart);
    })

})

router.get('/', async (req, res) => {
    const user = new Promise((resolve, reject) => {
        try {
            resolve(req.user.populate('cart.items.courseId'));
        } catch (e) {
            reject(e);
        }
    });

    user.then(result => {
        const courses = mapCartItems(result.cart);
        res.render('card', {
            title: 'Корзина',
            isCard: true,
            courses: courses,
            price: computePrice(courses)
        })
    })

})

module.exports = router;