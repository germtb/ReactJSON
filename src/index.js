import React from "react";

import ReactJSON from "./ReactJSON";
import State from "./State";

const root = {};

ReactJSON.mount(<State />, root, () => {
  console.log(root);
});
