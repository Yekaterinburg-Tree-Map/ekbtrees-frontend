import styles from './PageHeader.module.css';

const PageHeader = (props: { title: string }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerSplit}> </div>
            <div>{props.title}</div>
        </header>
    );
}

export default PageHeader
