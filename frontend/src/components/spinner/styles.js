/* eslint-disable import/prefer-default-export */
const styled = require('styled-components/macro');

export const Container = styled.div`
  width: 40px;
  height: 40px;
  margin: 10px auto;
  background-color: #333;
  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
  @-webkit-keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }
  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
`;
