import styles from "./PageLayout.module.css";

export default function PageLayout({ children, rightContent }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>{children}</div>
      <div className={styles.rightContent}>{rightContent}</div>
    </div>
  );
}