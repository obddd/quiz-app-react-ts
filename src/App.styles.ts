import styled, { createGlobalStyle } from 'styled-components';
//@ts-ignore
import Image from './assets/background.jpg';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Mulish', sans-serif;
        
    }
    html {
        height: 100%;
    }

    body {
        background-image: url(${Image});
        background-size:cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        
    }
`;

export const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #fff;
        font-size: 1.3rem;
    }

    h1 {
        font-family: 'Orbitron', sans-serif;
        font-size: 2.5rem;
        font-weight: 400;
        text-align: center;
        color: white;
        margin: 20px;
    }

    .start, .next {
        cursor: pointer;
        background: linear-gradient(180deg, #fff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
        border-radius: 8px;
        height: 40px;
        margin: 20px 0;
        padding: 0 40px;
    }

    .start {
        max-width: 200px
    }

`
