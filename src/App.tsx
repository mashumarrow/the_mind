import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import Success from "./views/Success";
import Failure from "./views/Failure";
import Layout from "./Layout";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}
export default App;
