import { Database, Doc } from "xwebdb";
import { remoteDB } from "./kv-adapter";
import { Implant } from "./db.implants";
import { Catalog } from "./db.catalogs";
import { countryCode } from "../../utils";

export class Company extends Doc {
	_id: string = Math.random().toString(36).substring(7);
    company: string = "";
    logo: string = "";
    website: string = "";
    country: string = "";
    profileShort: string = "";
    profileLong: string = "";
    catalogs: string[] = [];
    implants: string[] = [];
    _implants: Implant[] = [];
    _catalogs: Catalog[] = [];
    get flag () {
        return `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode(this.country)}.svg`;
    }
}

export const companies = new Database<Company>({
	ref: "companies",
	model: Company,
	sync: {
		syncToRemote: remoteDB("token", "https://db.implantsdb.com/companies"),
	},
});
