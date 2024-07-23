import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Issue, Comment } from "../../types"
import DOMPurify from 'dompurify';

import styles from './issuePage.module.css'

export default function IssuePage () {

    const [issue, setIssue] = useState({} as Issue)
    const [comments, setComments] = useState([] as Comment[])
    const { issueNumber } = useParams<{ issueNumber: string }>();

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const response = await axios.get<Issue>(`https://api.github.com/repos/facebook/react/issues/${issueNumber}`)
                setIssue(response.data)
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/facebook/react/issues/${issueNumber}/comments`)
                setComments(response.data)
            } catch (error) {
                console.error("Error fetching comments: ", error)
            }
        }        
        fetchIssue()
        fetchComments()
    }, [issueNumber])

    return (
        <div className={styles.issue}>
            <div className={`${styles.body} white-box`}>
                <h2>{issue.title}</h2>
                <p>{new Date(issue.created_at).toLocaleDateString()} by {issue.user?.login}</p>
                <hr />
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(issue.body || '') || '' }} />
            </div>
            <div className={`${styles.comments} white-box`}>
                <h3>Comments</h3>
                {comments.map((comment: any) => (
                    <div key={comment.id} className={styles.comment}>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.body || '') || '' }} />
                        <h4>by {comment.user.login}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

