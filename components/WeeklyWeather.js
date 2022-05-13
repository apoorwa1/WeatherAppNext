import moment from "moment-timezone";
import React from "react";

const WeeklyWeather = ({ weeklyWeather, timezone }) => {
  return (
    <div className="weekly">
      <h3 className="weekly__title">
        Weekly <span>Weather</span>
      </h3>
      {weeklyWeather.length > 0 &&
        weeklyWeather.map((weather, index) => {
          if (index == 0) {
            return;
          }
          return (
            <div className="weekly__card" key={weather.dt}>
              <div className="weekly__inner">
                <div className="weekly__left-content">
                  <div>
                    <h3>
                      {moment.unix(weather.dt).tz(timezone).format("dddd")}
                    </h3>
                    <h4>
                      <span>{weather.temp.max.toFixed(0)}&deg;C</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WeeklyWeather;
