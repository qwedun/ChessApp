import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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


