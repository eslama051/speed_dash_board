import axios from "axios";
export default axios.create({
  baseURL: "https://speed4ever.elsaed.aait-d.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "ar",
  },
});
