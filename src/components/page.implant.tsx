import { Component } from "react";
import "./style.catalogs.scss";
import { Implant } from "../data/db";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.page.implant.scss";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Tag } from "@carbon/react";
import { Catalog, Ruler, DataCategorical } from "@carbon/react/icons";
import { Catalog as CatalogModel } from "../data/db/db.catalogs";
import { appState } from "../data/app.state";
export class PageImplant extends Component<{
	implant: Implant;
	catalogs: CatalogModel[];
}> {
	get catalogs() {
		let specific = this.props.catalogs.filter((x) =>
			this.props.implant.catalogs.includes(x._id)
		);
		if(specific.length > 0){
			return specific;
		}
		else return this.props.implant._company?._catalogs!
	}
	render() {
		return (
			<div className="implant-page">
				<ImageGallery
					items={this.props.implant.imgs.map((x) => ({
						original: x,
					}))}
					autoPlay={false}
					showPlayButton={false}
					showFullscreenButton={false}
					showNav={this.props.implant.imgs.length > 1}
					additionalClass={
						this.props.implant.imgs.length === 0 ? "no-show" : ""
					}
				></ImageGallery>
				<div className="heading">
					<div className="name">{this.props.implant.name}</div>
					<div className="company" onClick={()=>appState.router.navigate("company:"+this.props.implant.company)}>
						<span className="company-name">
							<img
								src={this.props.implant._company?.logo}
								alt={`${this.props.implant._company?.company} logo`}
							/>
						</span>
					</div>
				</div>
				<div className="type">
					<Tag
						type={
							this.props.implant.type.toLowerCase() === "zygomatic"
								? "red"
								: this.props.implant.type.toLowerCase().includes("mini")
								? "green"
								: this.props.implant.type.toLowerCase().includes("one")
								? "blue"
								: "cool-gray"
						}
					>
						{this.props.implant.type} implant
					</Tag>
				</div>
				<Tabs>
					<TabList aria-label="List of tabs">
						<Tab renderIcon={() => <DataCategorical></DataCategorical>}>
							Features
						</Tab>
						<Tab renderIcon={() => <Ruler></Ruler>}>Sizes</Tab>
						<Tab renderIcon={() => <Catalog></Catalog>}>Catalogs</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<div className="features">
								{Object.keys(this.props.implant.feature)
									.sort()
									.map((key) => {
										let value =
											this.props.implant.feature[
												key as keyof typeof this.props.implant.feature
											]!;

										if (Array.isArray(value)) {
											value = value.join(", ");
										}
										return (
											<div className="feature" key={key}>
												<div className="key">{key}</div>
												<div className="img">
													<img
														src={
															key.toLowerCase() === "connection"
																? value.toLowerCase().includes("morse")
																	? "./features/connection__morse_taper.svg"
																	: value.toLowerCase().includes("internal")
																	? "./features/connection__internal_bevel.svg"
																	: value.toLowerCase().includes("external")
																	? "./features/connection_type__external.svg"
																	: "./features/connection__none.svg"
																: key.toLowerCase() === "platforms"
																? "./features/platform.svg"
																: `./features/${key
																		.toLowerCase()
																		.replace(/\s/g, "_")}__${value
																		.toLowerCase()
																		.replace(/-\d\.\d/, "")
																		.replace(/\s/g, "_")}.svg`
														}
													></img>
												</div>
												<div className="value">{value}</div>
											</div>
										);
									})}
							</div>
						</TabPanel>
						<TabPanel>
							<table>
								<thead>
									<tr>
										<th>Widths</th>
										<th>Lengths</th>
									</tr>
								</thead>
								<tbody>
									{this.props.implant.widths
										.concat(this.props.implant.heights)
										.map((_x, i) =>
											this.props.implant.widths.length > i ||
											this.props.implant.heights.length > i ? (
												<tr>
													<td>
														{this.props.implant.widths[i]
															? this.props.implant.widths[i]
															: ""}
													</td>
													<td>
														{this.props.implant.heights[i]
															? this.props.implant.heights[i]
															: ""}
													</td>
												</tr>
											) : (
												""
											)
										)}
								</tbody>
							</table>
						</TabPanel>
						<TabPanel>
							<div className="catalogs">
								{this.catalogs.length === 0 && <div>No catalogs available</div>}
								{this.catalogs.map((catalog) => {
									return (
										<div
											className="catalog"
											style={{ backgroundImage: `url(${catalog.thumbnail})` }}
											key={catalog._id}
											onClick={() => appState.router.navigate("catalog:" + catalog._id)}
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
					</TabPanels>
				</Tabs>
			</div>
		);
	}
}
