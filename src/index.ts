import "reflect-metadata";
import * as functions from "firebase-functions";
import { RuntimeOptions } from "firebase-functions/v1";
import { GmachApi } from "./server";

let _appInstance = new GmachApi();

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 45,
  memory: "128MB",
};

exports.api = functions.https.onRequest(_appInstance.export());
