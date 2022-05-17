import React from "react";
import Head from "next/head";
import cities from "../../lib/city.list.json";
import TodaysWeather from "../../components/TodaysWeather";
import moment from "moment-timezone";
import HourlyWeather from "../../components/HourlyWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import Searchbox from "../../components/Searchbox";

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
  //console.log(data);
  const slug = context.params.city;
  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
    },
  };
}

const getCity = (param) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];
  //console.log(id);

  if (!id) {
    return null;
  }
  const city = cities.find((city) => city.id.toString() == id);
  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);
  const todayData = hourlyData.filter((data) => data.dt < eodTimeStamp);
  return todayData;
};

const City = ({
  hourlyWeather,
  city,
  currentWeather,
  dailyWeather,
  timezone,
}) => {
  return (
    <div>
      <Head>
        <title>{city.name} Weather </title>
      </Head>
      <div className="page-wrapper">
        <div className="container">
          <Searchbox placeholder="Search for a location" />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
};

export default City;
