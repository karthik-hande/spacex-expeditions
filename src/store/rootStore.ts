import { createContext } from "react";
import { configure } from "mobx";

import SpacexStore from "./spacexStore";

configure({ enforceActions: "always" });

export class RootStore {
  spacexStore: SpacexStore;

  constructor() {
    this.spacexStore = new SpacexStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
