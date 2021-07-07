import React from "react";
import { CardsDiv, CardDiv } from "./components";

const Cards = ({ data, temperature }) => {
  return (
    <CardsDiv>
      {data.map((info, index) => (
        <CardDiv key={index}>
          <p>{info.time.split(" ")[1]}</p>
          <br />
          <img src={info.condition.icon} alt={info.condition.icon} />
          <br />
          <p>State: {info.condition.text}</p>
          <br />
          <p>Rain?: {info.daily_will_it_rain ? "Yes" : "No"}</p>
          <br />
          {temperature === "Celsius" ? (
            <p>Temp: {info.temp_c} ºC</p>
          ) : (
            <p>Temp: {info.temp_f} ºF</p>
          )}
        </CardDiv>
      ))}
    </CardsDiv>
  );
};

export default Cards;
