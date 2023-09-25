import "@fortawesome/react-fontawesome";
import { Mongoose } from "mongoose";

export declare global {
  var mongoose: {
    conn?: Mongoose;
    promise?: Promise<Mongoose>;
  };

  var _mongoClientPromise: Promise<MongoClient>;
}

declare module "@fortawesome/react-fontawesome" {
  export interface FontAwesomeIconProps {
    flip?: "horizontal" | "vertical" | "both" | boolean;
  }
}
