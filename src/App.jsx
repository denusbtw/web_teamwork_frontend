import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Competition from "./pages/Competition";
import PersonAccount from "./pages/PersonAccount";

import Unauthorized from "./LoginSignup/Unauthorized";
import Rating from "./pages/Rating";
import Footer from "./components/Footer";
import HackathonDetails from "./pages/HackathonDetails";
import LoginSignup from "./LoginSignup/LoginSignup";
import {UserProvider} from "./UserContext";
import HostAccount from "./pages/HostAccount";

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/hackathon/:id" element={<HackathonDetails />} />
          <Route path="/HostAccount" element={<HostAccount />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />
          {/* <Route path="/UploadData" element={<UploadData />} /> */}
          <Route path="/user/me" element={
              <PersonAccount />
          }/>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </UserProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
