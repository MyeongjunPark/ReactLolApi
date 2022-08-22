import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import champJson from "../json/champion.json";
const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const ProfileView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f5f6fa;
  border-radius: 20px;
  margin-bottom: 15px;
  img {
    margin-right: 10px;
  }
`;
const MostView = styled.div`
  display: flex;

  font-weight: 400;
  position: relative;
  ul {
    margin: 10px;
  }
  div {
  }
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  img:first-child {
    width: 80px;
    height: 80px;
    position: absolute;
    top: -20px;
    margin-left: 20px;
  }
`;
const MostChampName = styled.li`
  font-size: 20px;
`;
const MostChampLevel = styled.li`
  color: #0097e6;
  margin: 2px;
`;
const MostChampPoint = styled.li`
  font-size: 12px;
`;

const ProfileInfo = styled.div`
  display: block;
  font-size: 20px;

  font-weight: bold;
  div:first-child {
    font-size: 30px;
  }
`;
const Overview = styled.div`
  text-align: center;
`;
const OverviewItem = styled.div`
  display: block;

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
`;

function Profile({ name, profileIconId, summonerLevel, tier, rank, leaguePoints, wins, losses, champLevel, champPoints, champId }) {
  const [champName, setChampName] = useState([]);
  const profileImgUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${profileIconId}.jpg`;

  // let lowerStr = tier.toLowerCase();
  // let newStr = lowerStr.replace(/^[a-z]/, (char) => char.toUpperCase());

  const rankEmblemImg = `/img/Emblem_${tier}.png`;

  const masteryImg1 = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-profiles/global/default/mastery_level${champLevel[0]}.png`;
  const masteryImg2 = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-profiles/global/default/mastery_level${champLevel[1]}.png`;
  const masteryImg3 = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-profiles/global/default/mastery_level${champLevel[2]}.png`;
  const mostChamp1 = `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champName[0]}.png`;
  const mostChamp2 = `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champName[1]}.png`;
  const mostChamp3 = `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champName[2]}.png`;

  const champNameArray = () => {
    const championKeyDict = {};

    for (let key in champJson.data) {
      let value = champJson.data[key];
      championKeyDict[value.key] = value.id;
    }
    const champNameTrans = champId.map((data) => championKeyDict[data]);

    setChampName(champNameTrans);
  };
  useEffect(() => {
    champNameArray();
  }, []);

  return (
    <>
      <Container>
        <Overview>
          <ProfileView>
            <OverviewItem>
              <img src={profileImgUrl} alt="profileImg" />
            </OverviewItem>
            <ProfileInfo>
              <div>{name}</div>
              <div>{summonerLevel} Level</div>
            </ProfileInfo>
          </ProfileView>

          <ProfileView>
            <OverviewItem>
              <img src={rankEmblemImg} alt="TierEmblemImage" />
            </OverviewItem>
            <ProfileInfo>
              <OverviewItem>
                {tier} {rank}
              </OverviewItem>
              <OverviewItem>{leaguePoints} pt</OverviewItem>
              <OverviewItem>
                {wins}승 {losses}패 ({Math.round((wins / (wins + losses)) * 100)}%)
              </OverviewItem>
            </ProfileInfo>
          </ProfileView>
          <ProfileView>
            <MostView>
              <ul>
                <li>
                  <img src={masteryImg1} alt="masteryImg" />
                  <img src={mostChamp1} alt="champicon" />
                </li>
                <MostChampName>{champName[0]}</MostChampName>

                <MostChampLevel>{champLevel[0]} Level</MostChampLevel>
                <MostChampPoint>{champPoints[0]} Point</MostChampPoint>
              </ul>
              <ul>
                <li>
                  <img src={masteryImg2} alt="masteryImg" />
                  <img src={mostChamp2} alt="champicon" />
                </li>
                <MostChampName>{champName[1]}</MostChampName>

                <MostChampLevel>{champLevel[1]} Level</MostChampLevel>
                <MostChampPoint>{champPoints[1]} Point</MostChampPoint>
              </ul>
              <ul>
                <li>
                  <img src={masteryImg3} alt="masteryImg" />
                  <img src={mostChamp3} alt="champicon" />
                </li>
                <MostChampName>{champName[2]}</MostChampName>

                <MostChampLevel>{champLevel[2]} Level</MostChampLevel>
                <MostChampPoint>{champPoints[2]} Point</MostChampPoint>
              </ul>
            </MostView>
          </ProfileView>
        </Overview>
      </Container>
    </>
  );
}

export default Profile;
