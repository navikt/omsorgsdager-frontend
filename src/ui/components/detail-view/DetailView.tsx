import React from 'react';
import styles from './detailView.less';
import { Undertittel } from 'nav-frontend-typografi';

interface DetailViewProps {
    title: string;
    children: React.ReactNode;
}

const DetailView = ({ title, children }: DetailViewProps) => (
    <div className={styles.detailView}>
        <Undertittel>{title}</Undertittel>
        <hr style={{ color: '#B7B1A9' }} />
        {children}
    </div>
);

export default DetailView;
