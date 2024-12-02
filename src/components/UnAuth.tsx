import { createEffect } from "solid-js";
// import cookie from "js-cookie";
import { useNavigate } from "@solidjs/router";
import auth from "../store/auth";

const UnAuth = (props: any) => {
  const navigate = useNavigate();
  const { immichIsAuthenticated } = auth;

  createEffect(() => {
    if (immichIsAuthenticated()) {
      navigate("/");
    }
  });
  return <>{props.children}</>;
};

export default UnAuth;
