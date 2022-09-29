import router from "@/router";

export default {
  getUserAuthData(state, payload) {
    state.userData = payload;
    router.push("/");
  },
};
