import React from "react";
import { useSubscription, gql } from "@apollo/client";

const CHANGE_MARKS = gql`
    subscription changeMarks {
        marksUpdated {
            _id
            hid
            mid
            marks
            regno
        }
    }
`;

export default function Marks() {
    const { loading, data } = useSubscription(CHANGE_MARKS, {
        onData: (data) => console.log(data),
    });
    return (
        <div>
            <h5>Latest News</h5>
            <p>{loading ? "Loading..." : JSON.stringify(data)}</p>
        </div>
    );
}
