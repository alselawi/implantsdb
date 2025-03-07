import { Database, Doc } from "xwebdb";
import { remoteDB } from "./kv-adapter";

export class Catalog extends Doc {
	_id: string = Math.random().toString(36).substring(7);
	thumbnail: string = "";
	title: string = "";
	pages: string = "";
    lang: string = "";
    year: string = "";
    url: string = "";
}

export const catalogs = new Database<Catalog>({
	ref: "catalogs",
	model: Catalog,
	sync: {
		syncToRemote: remoteDB("token", "https://db.implantsdb.com/catalogs"),
	},
});
