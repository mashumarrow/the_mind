import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home/Home";
import Success from "./views/Success/Success";
import Failure from "./views/Failure/Failure";
import Layout from "./Layout";
import Room from "./views/Room/Room";
import Waiting from "./views/Waiting/Waiting";
import Start from "./views//Start/Start";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/room/:id/start" element={<Start />} />
          <Route path="/room/:id/success" element={<Success />} />
          <Route path="/room/:id/failure" element={<Failure />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}
export default App;
