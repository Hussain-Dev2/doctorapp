import axios from "axios";

const STRAPI_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "https://doctorstrapi.onrender.com";

const axiosGlobal = axios.create({
  baseURL: STRAPI_BASE + "/api",
});

const getCategories = () => axiosGlobal.get("/categories?populate=*");
const getDoctorsList = () => axiosGlobal.get("/doctors?populate=*");

const getDoctorByCategory = (category: string) =>
  axiosGlobal.get(
    "/doctors?populate=*&filters[category][name][$contains]=" + category
  );
const BookAppointment = (data: object) => {
  return axiosGlobal.post("/appointments", data);
}

const Api = { getCategories, getDoctorsList, getDoctorByCategory, BookAppointment };

export default Api;
