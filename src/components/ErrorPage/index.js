import style from './styles.module.css';

import notFound from '../../images/not-found.png';

import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section className={style['section-error-page']}>

            <div className={style['button-wrapper']}>
                <Link className={style['button-back']} to="/cars">Go to Cars</Link>
            </div>

            <img src={notFound} alt="404" />
        </section>
    )
}

export default ErrorPage;

