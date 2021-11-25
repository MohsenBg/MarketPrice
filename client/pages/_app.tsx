import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import { wrapper } from "../redux/store";
import Loading from "../components/Loading/Loading";
import Dispatcher from "../components/Dispatcher/Dispatcher";
import { ConnectedRouter } from "connected-next-router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConnectedRouter>
      <div>
        <Dispatcher />
        <div>
          <Loading />
        </div>
        <div>
          <NavBar />
        </div>
        <Component {...pageProps} />
      </div>
    </ConnectedRouter>
  );
}

export default wrapper.withRedux(MyApp);
