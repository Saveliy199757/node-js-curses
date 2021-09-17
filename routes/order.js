const { Router } = require('express');
const Order = require('../models/order');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({'user.userId': req.user._id}).populate('user.userId');
        const order = orders.map(o => {
            return {
                ...o._doc,
                price: o.courses.reduce((total, c) => {
                    return total += c.count + c.course.price
                }, 0)
            }
        });

        res.render('orders', {
            isOrder: true,
            title: 'Мои заказы',
            orders: order
        })

    } catch (e) {
        console.log('error', e)
    }

});

router.post('/', async (req, res) => {
    try {

        const userGet = new Promise((resolve) => {
            resolve(req.user.populate('cart.items.courseId'));
        });

        userGet.then(async user => {
            const courses = user.cart.items.map(i => ({
                count: i.count,
                course: {...i.courseId._doc}
            }))
            const order = new Order({
                user: {
                    userId: req.user
                },
                courses: courses
            })

            await order.save()
            res.redirect('/orders');
            await req.user.clearCart();
        })

    } catch (e) {
        console.log(e);
    }
});

module.exports = router;