import { useLocation, Link } from "react-router-dom";
import styles from "./breadcrumb.module.css";

export default function Breadcrumb() {
    const location = useLocation();
    const path = location.pathname.split("/").filter(p => p);

    return (
        <h2 className={styles.breadcrumb}>
            <Link to="/">Issues</Link>
            {path.map((p, index) => {
                const url = `/${path.slice(0, index + 1).join("/")}`;
                return (
                    <span key={url}>
                        {" > "}
                        <Link to={url}>{p}</Link>
                    </span>
                );
            })}
        </h2>
    );
}
