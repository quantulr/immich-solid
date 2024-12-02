import logo from "../assets/immich.svg";
import { getMyUser } from "@immich/sdk";
import { createResource } from "solid-js";
import auth from "../store/auth.tsx";

const NavBar = () => {
  const [myUser] = createResource(() => getMyUser());
  const { immichLogout } = auth;
  return (
    <div class={"navbar"}>
      <a class={"btn btn-ghost navbar-start w-[164px]"} href={"/"}>
        <img src={logo} class={"h-full"} alt={""} />
      </a>
      <div class={"flex-1"}></div>
      <div class={"flex-none"}>
        {myUser() && (
          <div class={"dropdown dropdown-end"}>
            <div
              tabIndex={0}
              role={"button"}
              class={"avatar btn btn-circle btn-ghost"}
            >
              <div class={"w-10 rounded-full"}>
                <img
                  alt={""}
                  src={`/api/users/${myUser()?.id}/profile-image?updatedAt=${myUser()?.updatedAt}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              class={
                "menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-lg bg-base-100 p-2 shadow"
              }
            >
              {/* <li>
              <a class={"justify-between"}>
                Profile
                <span class={"badge"}>New</span>
              </a>
            </li>*/}
              <li>
                <a>设置</a>
              </li>
              <li>
                <a
                  onClick={() => {
                    immichLogout();
                  }}
                >
                  退出登录
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
