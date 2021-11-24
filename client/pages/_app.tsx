import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Loading from "../components/Loading/Loading";
import Dispatcher from "../components/Dispatcher/Dispatcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default MyApp;
