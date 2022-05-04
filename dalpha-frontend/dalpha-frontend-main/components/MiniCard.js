import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function MiniCard(props) {
  return (
    <Link href={props.link}>
      <a className={styles.card}>
        <img src="favicon.ico" className={styles.companyImage} />
        <p className={styles.minicardName}>{props.name}</p>
      </a>
    </Link>
  );
}
