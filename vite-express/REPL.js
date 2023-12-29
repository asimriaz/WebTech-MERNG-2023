import * as db from "./models/index.js";

db.Course.find().then((courses) => console.log(courses));
