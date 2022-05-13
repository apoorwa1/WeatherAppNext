import React from "react";
import moment from "moment-timezone";
import Image from "next/image";

export default function ({ city, weather, timezone }) {
  //console.log(city, weather);
  return (
    <div className="today">
      <div className="today__inner">
        <div className="today__left-content">
          <h1>
            {city.name} ({city.country})
          </h1>
          <h2>{weather.temp.max.toFixed(0)}&deg;C</h2>
          <h3>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</h3>
          <h3>{timezone}</h3>
        </div>
        <div className="today__right-content">
          <div className="today__icon-wrapper">
            <div>
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weathericon"
                layout="fill"
              ></Image>
            </div>
          </div>
          <h3>{weather.weather[0].description}</h3>
        </div>
      </div>
    </div>
  );
}
