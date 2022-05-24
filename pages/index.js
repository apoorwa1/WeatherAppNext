import Head from "next/head";
import Searchbox from "../components/Searchbox";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MyWeatherApp </title>
      </Head>
      <div className="home">
        <div className="container">
          <h1>WeatherToday</h1>
          <Searchbox />
        </div>
      </div>
    </div>
  );
}
