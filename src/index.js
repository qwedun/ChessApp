import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp({
    apiKey: "AIzaSyCvNPga01Sp7ySB-EfYrpNepiyV_HCkH9w",
    authDomain: "chess-a0cc3.firebaseapp.com",
    projectId: "chess-a0cc3",
    storageBucket: "chess-a0cc3.appspot.com",
    messagingSenderId: "1000403902057",
    appId: "1:1000403902057:web:8f51c1c0d5674163210cf8",
    measurementId: "G-HQV4CTL9EG"
});
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
/*root.render(<StrictMode>

      <div className={styles.board}>
          <Game></Game>
      </div>
    </StrictMode>


); */

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <StrictMode>
                <App></App>
            </StrictMode>
        </BrowserRouter>
    </Provider>

)


