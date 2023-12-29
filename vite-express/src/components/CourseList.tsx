import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "./CourseForm";

type course = {
    _id: string;
    courseid: number;
    code: string;
    title: string;
    crhr: number;
    semester: number;
};

export default function CourseList() {
    const [courses, setCourses] = useState<course[]>([]);
    const [id, setId] = useState<string>("");

    const getCourses = async () => {
        const crs = await axios.get("/api/list");
        if (crs.data !== null) {
            setCourses(crs.data);
        }
    };

    const saveCourse = async (c: course) => {
        //console.log(c);
        const response = (await axios.post("/api/save", { ...c })).data;
        console.log(response);
        setCourses(
            courses.map((course) =>
                response._id === course._id ? response : course
            )
        );
    };

    const handleClick = (id: string) => {
        console.log(id);
        setId(id);
    };

    useEffect(() => {
        getCourses();
    }, []);

    //courses.map(c => ({}))

    return (
        <>
            <div className="col">
                {courses.length !== 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Code</th>
                                <th>Title</th>
                                <th>Semester</th>
                                <th>Cr</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.courseid}</td>
                                    <td>{c.code}</td>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={() => handleClick(c._id)}
                                        >
                                            {c.title}
                                        </a>
                                    </td>
                                    <td>{c.semester}</td>
                                    <td>{c.crhr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="col">
                {id !== "" ? (
                    <CourseForm id={id} saveCourse={saveCourse} />
                ) : null}
            </div>
        </>
    );
}
