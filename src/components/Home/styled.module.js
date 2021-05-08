import styled from 'styled-components';

import home from '../../images/home.jpg';
//const textColor = '#034a91';
const textColor = '#36A7E8';

export const SectionContainer = styled.section`
    width: 75%;
    height: 60%;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    border-radius: 10px;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.7), 
        rgba(255, 255, 255, 0.7)
    ),
    url(${home});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    h3 > a {
        color: ${textColor};
        text-decoration: none;
        letter-spacing: 1px;
        text-align: center;
        margin: 0px 0px 0px 0px;
        a {
            text-decoration: none;
        }
    }
`;
