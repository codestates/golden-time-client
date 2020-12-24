import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input:focus{
        outline: none;
        padding-left: 20px;
        font-size: 15px;
    }
    body{
        font-size: 15px;
        background-color: white;
        color: black;
        padding-top: 100px;
    }
`;

export default globalStyles;
