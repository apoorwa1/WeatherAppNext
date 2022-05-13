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
          <Searchbox />
        </div>
      </div>
    </div>
  );
}
