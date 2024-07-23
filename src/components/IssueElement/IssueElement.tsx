import { Issue } from "../../types"
import styles from "./issueElement.module.css"
import { Link } from "react-router-dom"

export default function IssueElement({ issue }: { issue: Issue }) {
    return (
        <Link to={`/${issue.number}`} className={styles.issue}>
            <div className={styles.labels}>
                {issue.labels.map(label => (
                    <div key={label.id} className={styles.label} style={{ borderColor: `#${label.color}` }}>
                        {label.name}
                    </div>
                ))}
            </div>
            <h3>{issue.title}</h3>
            <p>#{issue.number} opened {new Date(issue.created_at).toLocaleDateString()} by {issue.user.login}</p>
        </Link>
    )
}