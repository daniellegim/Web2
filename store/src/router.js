import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Items from "./Components/Items"
import About from "./Components/About"

function ReactRouter() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Items />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default ReactRouter;
