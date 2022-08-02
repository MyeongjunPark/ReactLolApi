import axios from "axios";
import { useState, useEffect } from "react";

import Profile from "./Profile";
import { useParams } from "react-router-dom";

function Summoner() {
  const [sumInfo, setSumInfo] = useState([]);
  const [tierInfo, setTier] = useState({});
  const [champMastery, setChampMastery] = useState([]);
  const [champKey, setChampKey] = useState({});
  const [champName, setChampName] = useState({});
  const [loading, setLoading] = useState(true);
  const idParams = useParams();

  const getSummoner = async () => {
    const response = await axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${idParams.id}`,
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
      url: `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
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
      url: `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
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
      url: `https://cors-anywhere.herokuapp.com/https://ddragon.leagueoflegends.com/cdn/12.13.1/data/ko_KR/champion.json`,
      dataType: "json",
    });
    setChampKey(championResponse.data.data);
  };

  useEffect(() => {
    getSummoner();
    getChampion();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    console.log(idParams.id);
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
