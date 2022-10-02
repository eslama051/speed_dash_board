export default {
  getUserAuthData(context, payload) {
    localStorage.setItem("Speed_Dash_User_Id", payload.id);
    localStorage.setItem("Speed_Dash_User_token", payload.token);
    localStorage.setItem("Speed_Dash_User_Type", payload.user_type);
    localStorage.setItem("Speed_Dash_user_img", payload.image);
    localStorage.setItem("Speed_Dash_user_phone", payload.phone);
    localStorage.setItem("Speed_Dash_user_name", payload.fullname);
    context.commit("getUserAuthData", payload);
  },
  removeUserData(context) {
    localStorage.removeItem("Speed_Dash_User_Id");
    localStorage.removeItem("Speed_Dash_User_token");
    localStorage.removeItem("Speed_Dash_User_Type");
    localStorage.removeItem("Speed_Dash_user_img");
    localStorage.removeItem("Speed_Dash_user_phone");
    localStorage.removeItem("Speed_Dash_user_name");
    context.commit("removeUserData");
  },
};
