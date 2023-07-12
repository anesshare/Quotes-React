import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

const Homepage = () => {
  const [covidWorldStats, setCovidWorldStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    url: "https://covid-193.p.rapidapi.com/statistics",
    headers: {
      "X-RapidAPI-Key": "00fe18ac1dmshdffc09875db85d5p1c7676jsnae71a105e5fa",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  const getDataCovidStats = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setCovidWorldStats(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataCovidStats();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading covid-19 image..</p>
      ) : (
        <div className="bg-cover">
          <img
            src="https://www.bloomberg.com/graphics/2020-coronavirus-cases-world-map/img/2020-coronavirus-cases-world-map-facebook.png?t=202011091543"
            className="center-image"
            alt="COVID-19"
          />
        </div>
      )}
      <h1
        style={{
          fontSize: "40px",
          color: "blue",
          textAlign: "center",
        }}
        className="card-title"
      >
        World Stats
      </h1>
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">Recovered</h2>
          <p className="card-text" style={{ color: "green" }}>
            {covidWorldStats.reduce(
              (prev, curr) => (prev += curr?.cases?.recovered || 0),
              0
            )}
          </p>
        </div>
        <div className="card">
          <h2 className="card-title">Deaths</h2>
          <p className="card-text" style={{ color: "red" }}>
            {covidWorldStats.reduce(
              (prev, curr) => (prev += curr?.deaths?.total || 0),
              0
            )}
          </p>
        </div>
        <div className="card">
          <h2 className="card-title">Active Cases</h2>
          <p className="card-text" style={{ color: "blue" }}>
            {covidWorldStats.reduce(
              (prev, curr) => (prev += curr?.cases?.active || 0),
              0
            )}
          </p>
        </div>

        <NavLink
          to="/country-stats"
          className="card"
          style={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 className="card-title">Country Stats</h2>
        </NavLink>
      </div>
    </>
  );
};

export default Homepage;