import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
