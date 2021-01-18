import * as React from 'react';
import classnames from 'classnames';
import styles from './iconWithTooltip.less';

interface IconWithTooltipProps {
    renderIcon: () => React.ReactNode;
    tooltipText: string;
    tooltipDirectionRight?: boolean;
}

const IconWithTooltip = ({ renderIcon, tooltipText, tooltipDirectionRight }: IconWithTooltipProps): JSX.Element => {
    const tooltipCls = classnames(styles.iconWithTooltip__tooltipText, {
        [styles['iconWithTooltip__tooltipText--right']]: tooltipDirectionRight,
    });
    return (
        <div className={styles.iconWithTooltip}>
            {renderIcon()}
            <div className={tooltipCls}>{tooltipText}</div>
        </div>
    );
};

export default IconWithTooltip;
