import { Database, Doc } from "xwebdb";
import { remoteDB } from "./kv-adapter";
import { Company } from "./db.companies";
import { Catalog } from "./db.catalogs";

export class Implant extends Doc {
	_id: string = Math.random().toString(36).substring(7);
	name: string = "";
	company: string = "";
	catalogs: string[] = [];
	imgs: string[] = [];
	type: string = "standard";
	feature: Partial<{
		Material: string;
		Level: string;
		"Connection Type": string;
		"Connection Shape": string;
		"Head Shape": string;
		"Head Microthreads": string;
		"Body Shape": string;
		"Body Threads": string;
		"Apex Shape": string;
		"Apex Hole": string;
		"Apex Grooves": string;
		Connection: string;
		screwdriver: string;
		Platforms: string[];
	}> = {};
	widths: string[] = [];
	heights: string[] = [];
	_company: Company | null = null;
	_catalogs: Catalog[] = [];
}

export const implants = new Database<Implant>({
	ref: "implants",
	model: Implant,
	sync: {
		syncToRemote: remoteDB("token", "https://db.implantsdb.com/implants"),
	},
});
