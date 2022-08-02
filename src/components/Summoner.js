import axios from "axios";
import { useState, useEffect } from "react";

import Profile from "./Profile";
import { useParams } from "react-router-dom";

function Summoner() {
  const [sumInfo, setSumInfo] = useState([]);
  const [tierInfo, setTier] = useState({});
  const [champMastery, setChampMastery] = useState([]);

  const [loading, setLoading] = useState(true);
  const idParams = useParams();

  const getSummoner = async () => {
    const response = await axios({
      method: "get",
      url: `https://mjooon-proxy.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${idParams.id}`,
      dataType: "json",
      headers: {
        "X-Riot-Token": "RGAPI-af2ce610-d084-42fa-9ade-6b58a5b2bcd1",
      },
    });
    setSumInfo(response.data);
    getTier(response.data.id);
    getMastery(response.data.id);
  };

  const getTier = async (id) => {
    const tierResponse = await axios({
      method: "get",
      url: `https://mjooon-proxy.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
      dataType: "json",
      headers: {
        "X-Riot-Token": "RGAPI-af2ce610-d084-42fa-9ade-6b58a5b2bcd1",
      },
    });
    setTier(tierResponse.data[0]);
  };

  const getMastery = async (id) => {
    const masteryResponse = await axios({
      method: "get",
      url: `https://mjooon-proxy.herokuapp.com/https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
      dataType: "json",
      headers: {
        "X-Riot-Token": "RGAPI-af2ce610-d084-42fa-9ade-6b58a5b2bcd1",
      },
    });
    setChampMastery(masteryResponse.data.slice(0, 3));
    setLoading(false);
  };

  useEffect(() => {
    getSummoner();
    // getChampion();

    // let timer = setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  }, []);

  // useEffect(() => {
  //
  // }, [champName]);
  const champLevel = champMastery.map((data) => data.championLevel);
  const champPoints = champMastery.map((data) => data.championPoints);
  const champId = champMastery.map((data) => data.championId);

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <Profile
          champId={champId}
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
