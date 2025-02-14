import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  body {
    background-color: #fff;
    color: #000;
    font-size: 16px;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
