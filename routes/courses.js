const { Router } = require('express');
const Courses = require('../models/courses');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Courses.getAll();
    res.render('courses', {
        title: "Курсы js",
        isCourses: true,
        courses
    });
})

module.exports = router;