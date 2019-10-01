import { observable, computed, action } from "mobx";
import { IUser, IUserFormValues } from "../models/User";
import agent from "../api/agent";
import { rootStore } from "./rootStore";

export default class UserStore {
  rootStore: rootStore;
  constructor(rootStore: rootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @computed get isLoggedIn() {
    return this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      this.user = user;
    } catch (error) {
      console.log(error);
    }
  };
}
