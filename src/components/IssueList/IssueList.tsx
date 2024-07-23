import { useState, useEffect } from "react";
import { Issue } from "../../types";
import axios from "axios";

import IssueElement from "../IssueElement/IssueElement";
import Pagination from "../Pagination/Pagination";

import styles from "./issueList.module.css";

export default function IssueList() {
    const [issues, setIssues] = useState([] as Issue[]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 12;

    useEffect(() => {
        const fetchTotalIssues = async () => {
            try {
                const response = await axios.get("https://api.github.com/repos/facebook/react");
                const totalIssues = response.data.open_issues_count;
                setTotalPages(Math.ceil(totalIssues / limit));
            } catch (error) {
                console.error("Error fetching repository metadata: ", error);
            }
        };

        fetchTotalIssues();
    }, []); 

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get<Issue[]>("https://api.github.com/repos/facebook/react/issues", {
                    params: {
                        per_page: limit,
                        page: page,
                    },
                });
                setIssues(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchIssues();
    }, [page]);

    return (
        <div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            <div className={styles.issues}>
                {issues.map(issue => (
                    <IssueElement key={issue.number} issue={issue} />
                ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
}
