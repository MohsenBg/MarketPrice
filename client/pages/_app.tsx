import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Loading from "../components/Loading/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div>
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
