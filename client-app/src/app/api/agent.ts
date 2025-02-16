import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/Activity";
import { history } from "../..";
import { toast } from "react-toastify";
import {IUser, IUserFormValues} from "../models/User"

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network Error -make sure API is running!");
  }
  const { data, status, config } = error.response;

  if (status === 404) {
    history.push("/notFound");
  }
  if (status === 400 && config.method === "get" && data.hasOwnProperty("id")) {
    history.push("/notFound");
  }
  if (status === 500) {
    toast.error("Server Error - check the terminal for more info!Î");
  }
  throw error;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => {
  return new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );
};

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  delete: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`)
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues) => requests.post("/user/login", user),
  register: (user: IUserFormValues) => requests.post("/user/register", user)
}

export default {
  Activities,
  User
};
