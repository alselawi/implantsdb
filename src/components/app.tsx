import { Component, ReactNode } from "react";
import "./style.app.scss";
import { observer } from "mobx-react";
import { Footer } from "./footer";
import { Header } from "./header";
import { Catalog, Company, Implant } from "../data/db";
import { PageHome } from "./page.home";
import { PageCompany } from "./page.company";
import { PageImplant } from "./page.implant";
import { appState } from "../data/app.state";
import { PageCatalog } from "./page.catalog";
import { PageSearch } from "./page.search";
import { PageCompanies } from "./page.companies";

@observer
export class App extends Component<{
	companies: Company[];
	implants: Implant[];
	catalogs: Catalog[];
}> {
	state: Readonly<{ num: number }> = {
		num: 0,
	};

	get currentPage(): "home" | "implant" | "company" | "search" | "catalog" | "companies" {
		return appState.router.currentPage.includes("search")
			? "search"
			: appState.router.currentPage.includes("catalog")
			? "catalog"
			: appState.router.currentPage.includes("implant")
			? "implant"
			: appState.router.currentPage.includes("company")
			? "company"
			: appState.router.currentPage.includes("search")
			? "search"
			: appState.router.currentPage.includes("companies")
			? "companies"
			: "home";
	}

	get currentID(): string {
		return appState.router.currentPage.split(":")[1];
	}

	render(): ReactNode {
		return (
			<main className="app">
				<Header implants={this.props.implants} />
				<main className="page">
					{this.currentPage === "search" && (
						<div className={`swipe-${appState.router.swipe}`}>
							<PageSearch implants={this.props.implants}></PageSearch>
						</div>
					)}

					{this.currentPage === "catalog" && (
						<div className={`swipe-${appState.router.swipe}`}>
							<PageCatalog
								catalog={
									this.props.catalogs.find((x) => x._id === this.currentID) ||
									this.props.catalogs[0]
								}
							></PageCatalog>
						</div>
					)}

					{this.currentPage === "implant" && (
						<div className={`swipe-${appState.router.swipe}`}>
							<PageImplant
								implant={
									this.props.implants.find((x) => x._id === this.currentID) ||
									this.props.implants[0]
								}
								catalogs={this.props.catalogs}
							></PageImplant>
						</div>
					)}

					{this.currentPage === "company" && (
						<div className={`swipe-${appState.router.swipe}`}>
							<PageCompany
								company={
									this.props.companies.find((x) => x._id === this.currentID)!
								}
							></PageCompany>
						</div>
					)}

					{this.currentPage === "home" && (
						<div className={`swipe-${appState.router.swipe}`}>
							<PageHome
								implants={this.props.implants}
								companies={this.props.companies}
							></PageHome>
						</div>
					)}

					{this.currentPage === "companies" && (
						<div className={`swipe-${appState.router.swipe}`}>
							<PageCompanies companies={this.props.companies}></PageCompanies>
						</div>
					)}
				</main>
				<Footer />
			</main>
		);
	}
}

// TODO: SVG logos, like IRES
// TODO: offline notice
// TODO: admin panel