import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import auth from "@/store/auth.tsx";

const RequiredAuth = (props: any) => {
  const navigate = useNavigate();
  const { immichIsAuthenticated } = auth;
  createEffect(() => {
    // const isauth = cookie.get("immich_is_authenticated") === 'true'
    // console.log(isauth)
    if (!immichIsAuthenticated()) {
      navigate("/login");
    }
  });
  return <>{props.children}</>;
};

export default RequiredAuth;
