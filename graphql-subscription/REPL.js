const db = require("./models");

// db.Student.find().then((students) => {
//   students.map(async (student) => {
//     //console.log(student.regno)
//     let result = await db.Mark.updateMany(
//       { regno: student.regno },
//       {
//         $set: {
//           student: student._id,
//         },
//       }
//     );
//     console.log(result);
//   });
// });

// db.Head.find().then((heads) => {
//   heads.forEach(async (head) => {
//     let result = await db.Mark.updateMany(
//       { hid: head.hid },
//       {
//         $set: {
//           head: head._id,
//         },
//       }
//     );
//     console.log(result);
//   });
// });

// db.Student.find().then((students) => {
//     students.forEach(async (student) => {
//         //console.log(student.regno);
//         let ids = await db.Mark.find({ regno: student.regno }).select({
//             _id: 1,
//         });

//         let result = await db.Student.updateOne(
//             { regno: student.regno },
//             {
//                 $push: {
//                     marks: ids,
//                 },
//             }
//         );
//     });
// });
db.Student.aggregate([
    {
        $lookup: {
            from: "marks",
            foreignField: "regno",
            localField: "regno",
            as: "obtain",
        },
    },
    { $unwind: "$obtain" },
    {
        $group: {
            _id: { regno: "$regno", name: "$name" },
            total: { $sum: "$obtain.marks" },
        },
    },
    {
        $project: {
            _id: 0,
            regno: "$_id.regno",
            name: "$_id.name",
            total: "$total",
        },
    },
])
    .then((res) => console.log(JSON.stringify(res, null, "\t")))
    .then(() => process.exit());

// (async () => {
//     const marks = await db.Student.find();
//     console.log(JSON.stringify(marks, null, "\t"));
//     process.exit();
// })();
