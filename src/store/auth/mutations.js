import router from "@/router";

export default {
  getUserAuthData(state, payload) {
    state.token = payload.token;
    router.push("/");
  },
  removeUserData(state) {
    state.token = "";
    router.push("/login");
  },
};
