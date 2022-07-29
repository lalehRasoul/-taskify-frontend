import { domain } from "./config";
import axios from "axios";
import { User } from "./user";
import { toast } from "react-toastify";

export class RequestError {
  message = "";
  orgError = null;

  constructor(message, orgError) {
    this.message = message;
    this.orgError = orgError;
  }
}

class Request {
  controller = undefined;

  constructor() {
    this.controller = new AbortController();
  }

  abort() {
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
  }

  async request({ method, url, data, domainLess = false }) {
    try {
      this.controller = new AbortController();
      const user = new User();
      const configs = {
        method: method.toUpperCase(),
        url: domainLess ? url : domain + url,
        headers: domainLess
          ? {}
          : {
              authorization: `bearer ${user.getToken()}`,
            },
      };
      if (!["GET", "DELETE"].includes(method.toUpperCase())) {
        configs.data = data;
      } else {
        configs.params = data;
      }
      if (this.controller) configs.signal = this.controller.signal;
      return await axios(configs);
    } catch (e) {
      if (axios.isCancel(e)) {
        toast("Request canceled.", {
          type: "error",
          autoClose: 3000,
          position: "bottom-left",
        });
      } else if (e?.response?.status === 401) {
        window.location.href = "/login";
        throw new RequestError("Unauthorized. reconnect.", e);
      }
      throw e;
    }
  }
}

export const requestApi = new Request();
