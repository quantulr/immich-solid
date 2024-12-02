import { useLocation } from "@solidjs/router";

interface MenuItem {
  path: string;
  label: string;
}

const menus: MenuItem[] = [
  {
    path: "/",
    label: "图库",
  },
  {
    path: "/albums",
    label: "相册",
  },
];

const SideMenu = () => {
  const location = useLocation();
  return (
    <div class={"sidemenu w-[180px] shrink-0"}>
      <ul class={"menu"}>
        {menus.map((item: MenuItem) => (
          <li>
            <a
              class={`${location.pathname === item.path ? "active" : ""}`}
              href={item.path}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
