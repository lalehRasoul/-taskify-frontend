import { selector } from "recoil";
import { projectState } from "./atoms";

export const projectSelectorState = selector({
  key: "projectSelectorState",
  get: ({ get }) => {
    const projects = get(projectState);
    return [...projects];
  },
});
