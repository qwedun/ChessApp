import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import Game from './board/game.js'
import styles from './index.module.scss'
import App from './app.jsx'
import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "./pages/MainPage/postsSlice";
import { Provider } from "react-redux";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
/*root.render(<StrictMode>

      <div className={styles.board}>
          <Game></Game>
      </div>
    </StrictMode>


); */

const store = configureStore({
    reducer: {
        items: postsReducer,
    }
})

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <StrictMode>
                <App></App>
            </StrictMode>
        </BrowserRouter>
    </Provider>

)


