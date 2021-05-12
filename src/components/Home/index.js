import {
    SectionContainer
} from './styled.module.js';

import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <SectionContainer>
            <h3><Link to={`/cars`}>CARS Register <i class="fas fa-sign-in-alt"></i></Link></h3>
        </SectionContainer>
    );
}

export default Home;
