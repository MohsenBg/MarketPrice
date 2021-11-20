import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBat/NavBar";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div>
        <div>
          <NavBar />
        </div>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
