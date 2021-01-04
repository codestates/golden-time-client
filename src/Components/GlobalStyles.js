import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input{
        padding-left: 20px;
        border: 0;
    }
    input::placeholder {
        color:gray;
    }
    input:focus{
        outline: none;
    }
    body{
        font-size: 15px;
        background-color: white;
        color: black;
        padding-top: 120px;
    }
`;

export default globalStyles;
