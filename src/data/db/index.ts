import { catalogs, Catalog } from "./db.catalogs";
import { companies, Company } from "./db.companies";
import { implants, Implant } from "./db.implants";

export const databases = {
	implants,
	companies,
	catalogs,
};


export {
	Implant,
	Company,
	Catalog,
};
