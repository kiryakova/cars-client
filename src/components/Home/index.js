import {
    SectionContainer
} from './styled.module.js';

//import style from './styles.module.css';

//import home from '../../images/home.jpg';

import { Link } from 'react-router-dom';

const Home = (props) => {
    return(
        <SectionContainer>
            <h3><Link to={`/cars`}>CARS Register <i class="fas fa-sign-in-alt"></i></Link></h3>
        </SectionContainer>
    );
}


/*
<section>
    <article>
    <article className={style['image']}>
    <img src={home} />
    </article>
    <article className={style['content']}>
    <h3><Link to={`/cars`}>CARS Register <i class="fas fa-sign-in-alt"></i></Link></h3>
    </article>
    </article>
</section>
*/
export default Home;
