import React, { Suspense } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Contractorscreen from "./screens/Contractorscreen";
import Workerscreen from "./screens/Workerscreen";
import Landing from "./screens/Landing"
import Map from "./components/Map";
import CheckHelmet from "./screens/CheckHelmet";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/signup"
          element={
            <Suspense fallback={<div className="loader"></div>}>
              <Registerscreen />
            </Suspense>
          }
        />
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<div className="loader"></div>}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          exact
          path="/signin"
          element={
            <Suspense fallback={<div className="loader"></div>}>
              <Loginscreen />
            </Suspense>
          }
        />

        <Route
          exact
          path="/contractor"
          element={
            <Suspense fallback={<div className="loader"></div>}>
              <Contractorscreen />
            </Suspense>
          }
        />

        <Route
          exact
          path="/worker"
          element={
            <Suspense fallback={<div className="loader"></div>}>
              <Workerscreen />
            </Suspense>
          }
        />

        <Route
          exact
          path="/map"
          element={
            <Suspense fallback={<div className="loader"></div>}>
              <Map />
            </Suspense>
          }
        />
        <Route exact path="/check-helmet" element ={<CheckHelmet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
