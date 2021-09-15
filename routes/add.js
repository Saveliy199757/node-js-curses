const { Router } = require('express');
const Courses = require('../models/courses');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: "Добавить курс",
        isAdd: true
    });
})

router.post('/', async (req, res) => {
    const course = new Courses({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    })

    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;