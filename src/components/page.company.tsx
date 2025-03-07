import { Component } from "react";
import { Company } from "../data/db";
import { Card } from "./card";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@carbon/react";
import { Barcode, Catalog, Enterprise } from "@carbon/react/icons";
import { appState } from "../data/app.state";
import "./style.catalogs.scss";
import "./style.page.company.scss";

export class PageCompany extends Component<{ company: Company }> {
	render() {
		return (
			<div className="company-page">
				<div className="heading">
					<div className="logo">
						<img
							src={this.props.company.logo || "https://via.placeholder.com/150"}
							alt={`${this.props.company.company} logo`}
						/>
					</div>
					<div className="text">
						<div className="flag">
							<img
								src={this.props.company.flag}
								alt={`${this.props.company.country} flag`}
							></img>
						</div>
						<div className="name">
							<div className="title">{this.props.company.company}</div>
							<div className="website">
								<a
									href={this.props.company.website}
									target="_blank"
									rel="noreferrer"
								>
									{this.props.company.website.replace(
										/^https?:\/\/(www\.)?/,
										""
									)}
								</a>
							</div>
						</div>
					</div>
				</div>

				<Tabs>
					<TabList aria-label="List of tabs">
						<Tab renderIcon={() => <Barcode></Barcode>}>Implants</Tab>
						<Tab renderIcon={() => <Catalog></Catalog>}>Catalogs</Tab>
						<Tab renderIcon={() => <Enterprise></Enterprise>}>About</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<div className="implants">
								<div className="list">
									{this.props.company._implants
										.filter((x) => x)
										.map((item) => (
											<Card key={item._id} item={item} />
										))}
								</div>
							</div>
						</TabPanel>
						<TabPanel>
							<div className="catalogs">
								{this.props.company._catalogs.length === 0 && (
									<div>No catalogs available</div>
								)}
								{this.props.company._catalogs.map((catalog) => {
									return (
										<div
											className="catalog"
											style={{ backgroundImage: `url(${catalog.thumbnail})` }}
											onClick={() => {
												appState.router.navigate("catalog:" + catalog._id);
											}}
										>
											<div className="overlay"></div>
											<div className="text">
												<div className="lang">{catalog.lang}</div>
												<div className="year">{catalog.year}</div>
												<div className="pages">{catalog.pages}</div>
												<div className="title">{catalog.title}</div>
											</div>
										</div>
									);
								})}
							</div>
						</TabPanel>
						<TabPanel>
							<div className="about">
							<p className="logo">
								<img
									src={
										this.props.company.logo || "https://via.placeholder.com/150"
									}
									alt={`${this.props.company.company} logo`}
								/>
							</p>

							<p className="website">
								<a
									href={this.props.company.website}
									target="_blank"
									rel="noreferrer"
								>
									{this.props.company.website.replace(/^https?:\/\//, "")}
								</a>
							</p>

							<p className="country">
								<img
									src={this.props.company.flag}
									alt={`${this.props.company.country} flag`}
								/>
								{this.props.company.country}
							</p>

							<p className="profile-short">{this.props.company.profileShort}</p>
							<p className="profile-long">{this.props.company.profileLong}</p>
							</div>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		);
	}
}
