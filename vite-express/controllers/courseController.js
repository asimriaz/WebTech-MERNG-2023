const api = require("../api/api");

exports.getAllCourses = async (req, res) => {
  api.get("/api/courses/list").then((course) => {
    res.render("list.vash", { courses: course.data });
  });
};

exports.saveCourse = async (req, res) => {
  //console.log(req.body);
  let result = await api.post("/api/courses/save", { ...req.body });
  res.render("update.vash", { course: result.data });
  //   api.get("/api/courses/list").then((course) => {
  //   });
};

exports.getCourseById = async (req, res) => {
  //console.log(req.query);

  api.get(`/api/courses/edit/${req.query.courseid}`).then((course) => {
    res.render("edit.vash", { course: course.data });
  });
};
