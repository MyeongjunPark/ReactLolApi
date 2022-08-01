import axios from "axios";
import { useState, useEffect } from "react";
import queryString from "query-string";
import Profile from "./Profile";

function Summoner() {
  const [sumInfo, setSumInfo] = useState([]);
  const [tierInfo, setTier] = useState({});
  const [champMastery, setChampMastery] = useState([]);
  const [champKey, setChampKey] = useState({});
  const [champName, setChampName] = useState({});
  const [loading, setLoading] = useState(true);
  const queryName = queryString.parse(window.location.search);

  const getSummoner = async () => {
    const response = await axios({
      method: "get",
      url: `/lol/summoner/v4/summoners/by-name/${queryName.name}`,
      //url: `/lol/summoner/v4/summoners/by-name/%EC%8B%A0%EC%9E%85%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C`,
      dataType: "json",
      headers: {
        "X-Riot-Token": "RGAPI-c7b8c0fc-2bbf-49b7-b743-6d8a9daed670",
      },
    });
    setSumInfo(response.data);
    getTier(response.data.id);
    getMastery(response.data.id);
  };

  const getTier = async (id) => {
    const tierResponse = await axios({
      method: "get",
      url: `/lol/league/v4/entries/by-summoner/${id}`,
      dataType: "json",
      headers: {
        "X-Riot-Token": "RGAPI-c7b8c0fc-2bbf-49b7-b743-6d8a9daed670",
      },
    });
    setTier(tierResponse.data[0]);
  };

  const getMastery = async (id) => {
    const masteryResponse = await axios({
      method: "get",
      url: `/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
      dataType: "json",
      headers: {
        "X-Riot-Token": "RGAPI-c7b8c0fc-2bbf-49b7-b743-6d8a9daed670",
      },
    });
    setChampMastery(masteryResponse.data.slice(0, 3));
  };

  const getChampion = async () => {
    const championResponse = await axios({
      method: "get",
      url: `https://ddragon.leagueoflegends.com/cdn/12.13.1/data/ko_KR/champion.json`,
      dataType: "json",
    });
    setChampKey(championResponse.data.data);
  };

  useEffect(() => {
    getSummoner();
    getChampion();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const championKeyDict = {};
    for (let key in champKey) {
      let value = champKey[key];
      championKeyDict[value.key] = value.id;
    }
    const champId = champMastery.map((data) => championKeyDict[data.championId]);

    setChampName(champId);
  }, [loading]);

  const champLevel = champMastery.map((data) => data.championLevel);
  const champPoints = champMastery.map((data) => data.championPoints);

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <Profile
          champName={champName}
          champLevel={champLevel}
          champPoints={champPoints}
          name={sumInfo.name}
          profileIconId={sumInfo.profileIconId}
          summonerLevel={sumInfo.summonerLevel}
          tier={tierInfo.tier}
          rank={tierInfo.rank}
          leaguePoints={tierInfo.leaguePoints}
          wins={tierInfo.wins}
          losses={tierInfo.losses}
        />
      )}
    </>
  );
}
export default Summoner;
