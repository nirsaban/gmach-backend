import "reflect-metadata";
import { GmachApi } from "./server";

let _appInstance: GmachApi = new GmachApi();

const port = 4000;

console.log("index- " + __filename);

_appInstance = new GmachApi();
_appInstance
  .start(port)
  .then((port) => console.log(`server running on port ${port}`))
  .catch((err) => console.error(err));
