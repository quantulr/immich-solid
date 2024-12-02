import { createRoot, createSignal } from "solid-js";
import { login, LoginCredentialDto } from "@immich/sdk";
import Cookies from "js-cookie";

function createAuth() {
  const isAuthenticated = Cookies.get("immich_is_authenticated") === "true";
  const [immichIsAuthenticated, setImmichIsAuthenticated] =
    createSignal<boolean>(isAuthenticated);
  const immichLogin = async ({ email, password }: LoginCredentialDto) => {
    await login({
      loginCredentialDto: {
        email,
        password,
      },
    });
    setImmichIsAuthenticated(true);
  };
  const immichLogout = () => {
    Cookies.remove("immich_is_authenticated");
    setImmichIsAuthenticated(false);
  };
  return { immichIsAuthenticated, immichLogin, immichLogout };
}

export default createRoot(createAuth);
