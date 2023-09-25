import { Mongoose } from "mongoose";
import "react-fontawesome";

export declare global {
  var mongoose: {
    conn?: Mongoose;
    promise?: Promise<Mongoose>;
  };

  var _mongoClientPromise: Promise<MongoClient>;
}

declare module "react-fontawesome" {
  export type FlipProp = "horizontal" | "vertical" | "both" | boolean;
}
