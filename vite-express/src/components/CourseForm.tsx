import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

type Props = {
    id: string;
    saveCourse: (course: course) => void;
};
type course = {
    _id: string;
    courseid: number;
    code: string;
    title: string;
    crhr: number;
    semester: number;
};

export default function CourseForm({ id, saveCourse }: Props) {
    const [course, setCourse] = useState<course>(Object);

    const getCourseById = async (id: string) => {
        const course = await axios.get(`/api/course/${id}`);
        //console.log(course.data)
        if (course.data) {
            setCourse(course.data);
        }
    };
    useEffect(() => {
        getCourseById(id);
    }, []);

    useEffect(() => {
        getCourseById(id);
    }, [id]);

    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setCourse({ ...course, [e.currentTarget.name]: e.currentTarget.value });
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveCourse(course);
        //console.log(course);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Id : </td>
                            <td>
                                {course.courseid || ""}
                                <input
                                    type="hidden"
                                    name="_id"
                                    defaultValue={course._id || ""}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Code : </td>
                            <td>
                                <input
                                    type="text"
                                    name="code"
                                    value={course.code || ""}
                                    //onChange={(e) => setCode(e.target.value)}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Title : </td>
                            <td>
                                <textarea
                                    name="title"
                                    value={course.title || ""}
                                    rows={2}
                                    cols={30}
                                    //onChange={(e) => setTitle(e.target.value)}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Semester : </td>
                            <td>
                                <input
                                    type="text"
                                    name="semester"
                                    value={Number(course.semester) || ""}
                                    //onChange={(e) => setSemester(Number(e.target.value))}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>crhr</td>
                            <td>
                                <input
                                    type="text"
                                    name="crhr"
                                    value={Number(course.crhr) || ""}
                                    //onChange={(e) => setCrhr(Number(e.target.value)) }
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <pre>{JSON.stringify(course, null, 4)}</pre>
        </div>
    );
}
