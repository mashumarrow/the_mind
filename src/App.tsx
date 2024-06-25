import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home/Home";
import Success from "./views/Success/Success";
import Failure from "./views/Failure/Failure";
import Layout from "./Layout";
import Room from "./views/Room/Room";
import Waiting from "./views/Waiting/Waiting";
import Start from "./views//Start/Start";
import ModalCard from "./views/Start/components/Modal";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/room" element={<Room />} />
          <Route path="/start" element={<Start />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/modal" element={<ModalCard />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}
export default App;
