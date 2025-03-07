import { Component } from "react";
import { App } from "./app";
import "./style.loader.scss";
import { ProgressBar } from "@carbon/react";
import { databases, Company, Catalog, Implant } from "../data/db";
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

export class Loader extends Component {
	state: {
		loaded: boolean;
		status: "active" | "finished" | "error";
		step: string;
	} = { loaded: false, status: "active", step: "Loading application core" };

	companies: Company[] = [];
	catalogs: Catalog[] = [];
	implants: Implant[] = [];

	async componentDidMount() {
		// TODO: loading is taking too much time initially, we may have to give a ready made static file on initial install
		try {
			this.setState({ step: "Loading companies" });
			await databases.companies.sync();
			this.companies = await databases.companies.find({});
			this.setState({ step: "Loading implants" });
			await databases.implants.sync();
			this.implants = await databases.implants.find({});
			this.setState({ step: "Loading catalogs" });
			await databases.catalogs.sync();
			this.catalogs = await databases.catalogs.find({});
			this.setState({ step: "Setting up application" });
			this.companies = this.companies.map((company) => {
				company._catalogs = company.catalogs.map(
					(id) => this.catalogs.find((catalog) => catalog._id === id)!
				);
				company._implants = company.implants.map(
					(id) => this.implants.find((implant) => implant._id === id)!
				);
				return company;
			});
			this.implants = this.implants.map((implant) => {
				implant._company = this.companies.find(
					(company) => company._id === implant.company
				)!;
				implant._catalogs = implant.catalogs.map(
					(id) => this.catalogs.find((catalog) => catalog._id === id)!
				).filter((x) => x);
				return implant;
			});
			await new Promise((resolve) => setTimeout(resolve, 1000));
			this.setState({ loaded: true, status: "Finished" });
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			this.setState({ status: "error", step: "Error loading data" });
		}
	}
	render() {
		return this.state.loaded ? (
			<App
				// TODO: this is not reactive
				implants={this.implants}
				catalogs={this.catalogs}
				companies={this.companies}
			/>
		) : (
			<div className="loading">
				<div className="logo">
					<img src="logo.png"></img>
				</div>
				<div className="bar">
					<ProgressBar
						label="Loading"
						helperText={this.state.step}
						status={this.state.status}
					/>
				</div>
			</div>
		);
	}
}
