import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import Marks from "./components/Marks";

function App() {
    const [count, setCount] = useState(0);

    const GET_STUDENT_MARKS = gql`
        query GetStudentMarks {
            students {
                _id
                regno
                name
                marks {
                    hid
                    marks
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_STUDENT_MARKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(data);

    // useEffect(() => {
    //     //console.log(useQuery(GET_STUDENT_MARKS));
    // }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <Marks />
        </>
    );
}

export default App;
