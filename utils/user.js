import { localStorageKeys } from "./config";

export class User {
  constructor() {
    this.token = "";
    this.userData = {};
    if (typeof window === "undefined") return null;
    const tokenString = window.localStorage.getItem(localStorageKeys.token);
    const userString = window.localStorage.getItem(localStorageKeys.user);
    if (tokenString) this.token = tokenString;
    if (userString) {
      try {
        this.userData = JSON.parse(userString);
      } catch (e) {
        this.userData = {};
      }
    }
  }

  getToken() {
    return this.token;
  }

  getUserData() {
    return this.userData;
  }

  setToken(token) {
    if (typeof window === "undefined") return null;
    window.localStorage.removeItem(localStorageKeys.token);
    window.localStorage.setItem(localStorageKeys.token, token);
    this.token = token;
  }

  setUserData(data) {
    if (typeof window === "undefined") return null;
    try {
      this.userData = data;
      window.localStorage.removeItem(localStorageKeys.user);
      window.localStorage.setItem(localStorageKeys.user, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  logout() {
    if (typeof window === "undefined") return null;
    this.userData = null;
    this.token = "";
    window.localStorage.removeItem(localStorageKeys.token);
    window.localStorage.removeItem(localStorageKeys.user);
  }
}
