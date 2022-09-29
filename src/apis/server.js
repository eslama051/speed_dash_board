import axios from "axios";
import store from "@/store";
export default axios.create({
  baseURL: "https://speed4ever.elsaed.aait-d.com",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${store.getters["auth/token"]}`,
    "Content-Type": "application/json",
    "Accept-Language": "ar",
  },
});
