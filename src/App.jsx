import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth.jsx";
import Train from "./pages/Train";
import Translate from "./pages/Translate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* If user goes to "/", show Login */}
                <Route path="/" element={<Login />} />

                {/* If user goes to "/login", show Login */}
                <Route path="/login" element={<Login />} />

                {/* If user goes to "/train", show Train */}
                <Route path="/train" element={<Train />} />

                {/* If user goes to "/translate", show Translate */}
                <Route path="/translate" element={<Translate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;