import style from "./Login.module.css";
import { createSignal } from "solid-js";
import auth from "@/store/auth.tsx";
// import { login } from "@immich/sdk";
// import auth from "../store/auth";

const Login = () => {
  const [form, setForm] = createSignal<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const { immichLogin } = auth;
  return (
    <div
      class={"flex h-screen w-screen items-center justify-center bg-blue-50"}
    >
      <div class={"w-96 rounded-lg bg-white px-12 py-8 shadow-lg"}>
        <img src={"/immich.svg"} class={"mx-auto w-2/3"} alt={""} />
        <form
          class={"mt-3"}
          onSubmit={(e) => {
            e.preventDefault();
            void immichLogin(form());
          }}
        >
          <div class={`${style.field}`}>
            <label for={"email"} class={`${style.label}`}>
              邮箱
            </label>
            <input
              id={"email"}
              name={"email"}
              class={`${style.input} input input-bordered w-full`}
              placeholder={"邮箱"}
              value={form().email}
              onChange={(e) => {
                setForm({ ...form(), email: e.target.value });
              }}
            />
          </div>
          <div class={`${style.field}`}>
            <label for={"password"} class={`${style.label}`}>
              密码
            </label>
            <input
              value={form().password}
              onChange={(e) => {
                setForm({ ...form(), password: e.target.value });
              }}
              id={"password"}
              name={"password"}
              class={`${style.input} input input-bordered w-full`}
              type={"password"}
              placeholder={"密码"}
            />
          </div>
          <button type={"submit"} class={"btn mt-3 w-full"}>
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
