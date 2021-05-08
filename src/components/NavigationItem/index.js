import style from './styles.module.css';

import {Link} from 'react-router-dom';

const NavigationItem = ({
    id,
    liClassName,
    linkClassName,
    href,
    children,
    isSelected,
    onClick
}) => {
    let classes = [];

    if (isSelected) {
        classes.push(style[linkClassName]);
    }

    return(
        <li className={style[liClassName]}>
            <Link className={classes.join(' ')} to={href}  exact={true} onClick={() => onClick(id)} >
            {children}
            </Link>
        </li>
    );
}

export default NavigationItem;