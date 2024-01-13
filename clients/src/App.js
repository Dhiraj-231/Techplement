import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Headers/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import "./App.css"
import Home from "./components/Home/Home";
const App = () => {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={"kl"} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;