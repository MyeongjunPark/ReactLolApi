import { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const Wrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  div:first-child {
    font-size: 50px;
    margin-bottom: 20px;
    color: white;
  }
`;

const SearchInput = styled.input`
  width: 400px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: #dcdde1;
`;
const SearchBtn = styled.button`
  margin-top: 10px;
  border: 0;
  width: 400px;
  height: 40px;
  font-size: 20px;
  border-radius: 20px;
  background-color: #82c8a0;
  cursor: pointer;
  &:active {
    box-shadow: 0 0 0 2px #cb99c5 inset, 0 0 0 5px rgba(255, 255, 255, 0.15) inset, 0 0 0 3px rgba(0, 0, 0, 0.4);
  }
  &:hover {
    background-color: #82c8d2;
  }
  a {
    display: block;
    width: 380px;
    height: 40px;
    color: #000;
    text-decoration: none;
  }
`;

function Home() {
  const [sumName, setSumName] = useState("");

  const searchSummoner = (e) => {
    setSumName(e.target.value);
  };

  const searchBtn = () => {
    if (sumName == "") {
      alert("닉네임을 입력해주세요!");
    }
  };
  const enterClick = (e) => {
    if (e.code == "Enter") {
      searchBtn();
    }
  };

  return (
    <>
      <Wrap>
        <div>MY LOL PROFILE</div>
        <SearchInput placeholder="LOL 닉네임을 입력하세요." type="text" onChange={searchSummoner} onKeyPress={enterClick} />
        <br />
        <SearchBtn>
          <Link onClick={searchBtn} to={`/summoner/${sumName}`}>
            Search
          </Link>
        </SearchBtn>
      </Wrap>
    </>
  );
}
export default Home;
