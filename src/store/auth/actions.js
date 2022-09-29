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
};
