import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";

const root = createRoot(document.getElementById('root')!);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <StrictMode>
                <App></App>
            </StrictMode>
        </BrowserRouter>
    </Provider>
)


