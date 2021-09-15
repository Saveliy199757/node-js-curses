const { Router } = require('express');
const Courses = require('../models/courses');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Courses.find(); // Courses.find().populate('UserId', 'email name')
    res.render('courses', {
        title: "Курсы js",
        isCourses: true,
        courses
    });
})

router.post('/edit', async (req, res) => {
    const { id } = req.body;
    delete req.body.id;

    await Courses.findByIdAndUpdate(id, req.body);

    res.redirect('/courses');
})

router.post('/remove', async (req, res) => {
    try {
        await Courses.deleteOne({ _id: req.body.id });
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
})

router.get('/id-:id', async (req, res) => {
    const course = await Courses.findById(req.params.id)
    res.render('course', {
        layout: 'empty',
        title: 'Курс',
        course
    })
});

router.get('/id-:id/edit', async (req, res) => {
    if (!req.query.allow) {
       return res.redirect('/');
    }

    const course = await Courses.findById(req.params.id)

    res.render('course-edit', {
        title: `Редактировать курс ${course.title}`,
        course
    })
})

module.exports = router;