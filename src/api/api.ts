import { ILaunch } from "./../models/types";
import axios, { AxiosResponse } from "axios";
import history from "../history";

axios.defaults.baseURL = "https://api.spaceXdata.com/v3";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    console.log("Network error - make sure API is running!");
  }
  const { status } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (status === 500) {
    console.log("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const Launches = {
  all: (params: URLSearchParams): Promise<ILaunch[]> =>
    axios.get("/launches", { params: params }).then(responseBody),
};

const apiExp = {
  Launches
}

export default apiExp;
