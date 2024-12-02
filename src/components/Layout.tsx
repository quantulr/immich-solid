import SideMenu from "./SideMenu.tsx";
import NavBar from "./NavBar.tsx";

const Layout = (props: any) => {
  return (
    <div class={"flex h-screen max-h-screen flex-col bg-blue-50"}>
      <NavBar />
      <div class={"flex flex-1"}>
        <SideMenu />
        <div
          class={"flex-1 rounded-lg bg-base-100 shadow-lg"}
          style={{
            height: "calc(100vh - 64px)",
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
