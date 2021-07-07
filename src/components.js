import styled from "styled-components";
const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 3px solid black;
  text-align: center;
  background: transparent;
  font-size: 20px;
  &::placeholder {
    color: #aaa;
  }
`;
const FirstPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.back});
  background-position: center center;
  background-size: cover;
  @media (max-width: 768px) {
    padding-top: 50px;
    height: 100%;
  }
`;
const SecondPage = styled.div`
  background: #9b3fc1;
  height: 100%;
  padding: 50px 0;
`;
const CardsDiv = styled.div`
  display: flex;
  width: 80%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 30px;
  margin: 20px;
  &::-webkit-scrollbar {
    border-radius: 10px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(
      to left,
      rgba(100, 100, 100, 0.5),
      rgba(500, 500, 500, 0.5)
    );
  }
`;
const CardDiv = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 5px;
  padding: 70px 100px;
  width: max-content;
  text-align: center;
  background-color: rgba(100, 100, 100, 0.5);
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
const Button = styled.button`
  border: 1px solid black;
  outline: none;
  margin: 1px;
  font-weight: 700;
  background: rgba(100, 100, 100, 0.5);
  color: white;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background: rgba(150, 150, 150, 0.7);
  }
`;
export { Input, FirstPage, SecondPage, CardsDiv, CardDiv, Button };
