import * as React from 'react';
import styles from './error.less';

interface ErrorProps {
    message?: string;
}

const Error = ({ message }: ErrorProps): JSX.Element => <p className={styles.error}>{message}</p>;

export default Error;
