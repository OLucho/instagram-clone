import styled from 'styled-components/macro';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
    align-items: flex-start;
  }
`;

export const Form = styled.form`
  background: #fff;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    border-radius: 50%;
    height: 200px;
    width: 200px;
    margin: 1rem 0;
  }
  p {
    color: #999;
    font-size: 14px;
    margin: 0.7rem 0;
    color: indianred;
  }
  @media (max-width: 450px) {
    background: transparent;
    border: 0;
  }
  hr {
    width: 100%;
    color: #e6e6e6;
    margin: 30px 0;
  }
  span {
    text-align: center;
    color: #999;
    font-size: 20px;
    margin: 15px 0;
    &.footer {
      font-size: 12px;
    }
  }
  input {
    width: 100%;
    max-width: 350px;
    margin-bottom: 7px;
    padding: 10px 8px;
    font: 400 13.333px Arial;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 9px 9px;
    background-color: #3897f0;
    border: 1px solid #3897f0;
    border-radius: 4px;
    margin-top: 20px;
    font: bold 13.333px Arial;
    color: #fff;
    cursor: pointer;
    outline: 0px;
    &:hover {
      background-color: #38ff;
    }
  }
  label {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0.7rem 0;
  }
  height: auto;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  @media (min-width: 450px) {
    max-width: 350px;
  }
`;
