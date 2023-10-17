// Generated by Xata Codegen 0.26.9. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Users",
    columns: [
      { name: "credits", type: "int", notNull: true, defaultValue: "0" },
      { name: "clerkId", type: "string" },
      { name: "videos", type: "link", link: { table: "Videos" } },
      { name: "memes", type: "link", link: { table: "Memes" } },
    ],
  },
  {
    name: "Videos",
    columns: [
      {
        name: "prompt",
        type: "text",
        notNull: true,
        defaultValue: "A cartoon polar bear dancing",
      },
      {
        name: "generationSettings",
        type: "json",
        notNull: true,
        defaultValue: "{}",
      },
      { name: "video", type: "file" },
    ],
    revLinks: [
      { column: "videos", table: "Users" },
      { column: "video", table: "Memes" },
    ],
  },
  {
    name: "Memes",
    columns: [
      { name: "video", type: "link", link: { table: "Videos" } },
      { name: "text", type: "text" },
      { name: "videoText", type: "json" },
      { name: "file", type: "file" },
    ],
    revLinks: [{ column: "memes", table: "Users" }],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["Users"];
export type UsersRecord = Users & XataRecord;

export type Videos = InferredTypes["Videos"];
export type VideosRecord = Videos & XataRecord;

export type Memes = InferredTypes["Memes"];
export type MemesRecord = Memes & XataRecord;

export type DatabaseSchema = {
  Users: UsersRecord;
  Videos: VideosRecord;
  Memes: MemesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Sebastian-s-workspace-u593rk.eu-central-1.xata.sh/db/Giftronic",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
