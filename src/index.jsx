import App from "./App";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import './style/account.css';
import './style/competition.css';
import './style/foooter.css';
import './style/general.css';
import './style/hackathon-card.css';
import './style/hackathon.css';
import './style/home.css';
import "./style/rating.css";
import './style/topbar.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
