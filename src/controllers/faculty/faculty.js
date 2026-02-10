import {  getFacultyBySlug, getSortedFaculty } from "../../models/faculty/faculty.js";

// Route handler for individual faculty detail pages
const facultyListPage = async (req, res) => {
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';
    const facultyList = await getSortedFaculty(sortBy);
    console.log(`Faculty list requested sorted by ${sortBy}:`, facultyList); // Debug log


    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyList,
        currentSort: sortBy
    });
};

const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);

    console.log(`Faculty detail requested for slug: ${facultySlug}`); // Debug log
    console.log('Faculty member data retrieved:', facultyMember); // Debug log

    // If faculty member doesn't exist, create 404 error
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    
    res.render('faculty/detail', {
        title: `${facultyMember.name} - Faculty Profile`,
        faculty: facultyMember
    });
};


export { facultyListPage, facultyDetailPage};
