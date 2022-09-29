import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("Speed_Dash_User_token"),
    userData: "",
  },
  mutations,
  actions,
  getters,
};
