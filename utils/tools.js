import { toast } from "react-toastify";

export const errorHandler = (e) => {
  const messages = e?.response?.data?.message || null;
  const toastOptions = {
    autoClose: 2000,
    position: "bottom-left",
    type: "error",
  };
  if (messages instanceof Array) {
    for (const msg of messages) {
      toast(msg, toastOptions);
    }
  } else if (typeof messages === "string") {
    toast(messages, toastOptions);
  } else {
    toast("Something went wrong.", toastOptions);
  }
};
