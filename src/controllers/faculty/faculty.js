import {  getSortedFaculty } from "../../models/faculty/faculty.js";

// Route handler for individual faculty detail pages
const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'department';
    const listofFaculty = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: listofFaculty,
        currentSort: sortBy
    });
};

const facultyDetailPage = (req, res, next) => {
    const facultyName = req.params.name;
    const facultyMember = getFacultyByID(facultyName);

    // If faculty member doesn't exist, create 404 error
    if (!facultyMember) {
        const err = new Error(`Faculty member ${facultyName} not found`);
        err.status = 404;
        return next(err);
    }

    
    res.render('faculty/detail', {
        title: `${facultyMember.name} -  ${facultyMember.title}`,
        faculty: facultyMember
    });
};


export { facultyListPage, facultyDetailPage};
