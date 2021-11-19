import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBat/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
