/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import { Route, Router } from "@solidjs/router";
import Library from "./components/Library.tsx";
import Albums from "./components/Albums.tsx";
import Login from "./components/Login.tsx";
import RequiredAuth from "./components/RequiredAuth.tsx";
import Album from "./components/Album.tsx";
import Layout from "./components/Layout.tsx";
import UnAuth from "./components/UnAuth.tsx";

const root = document.getElementById("root");

// render(() => <App />, root!)

render(
  () => (
    <Router>
      <Route component={UnAuth}>
        <Route path={"/login"} component={Login} />
      </Route>
      <Route path={"/"} component={RequiredAuth}>
        <Route component={Layout}>
          <Route path={"about"} component={() => <h1>123</h1>} />
          <Route path={"albums"} component={Albums} />
          <Route path={"albums/:albumId"} component={Album}>
            <Route path={""} />
            <Route path={"photos/:assetId"} />
          </Route>
          <Route path={""} component={Library}>
            <Route path={""} />
            <Route path={"photos/:assetId"} />
          </Route>
        </Route>
        {/*<Route path={"photos/:assetId"} component={Photo} />*/}
        {/*<Route path={"albums/:albumId/photos/:assetId"} component={Photo} />*/}
      </Route>
      <Route
        path={"*404"}
        component={() => <h1 class={"mt-10 text-center"}>404 not found!</h1>}
      />
    </Router>
  ),
  root!,
);
