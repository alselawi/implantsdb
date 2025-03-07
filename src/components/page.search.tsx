import { Component, ReactNode } from "react";
import { Implant } from "../data/db";
import { Card } from "./card";
import {
	DropdownMenuItemType,
	ComboBox,
	IComboBox,
	TagPicker,
	FontIcon,
	SearchBox,
} from "@fluentui/react";
import { Icon } from "@fluentui/react";
import { observer } from "mobx-react";
import { appState } from "../data/app.state";
import "./style.page.search.scss";
import { countryCode } from "../utils";
import { ChevronDown } from "@carbon/react/icons";

@observer
export class PageSearch extends Component<{
	implants: Implant[];
}> {
	features: IComboBox | null = null;
	inputRef: any;

	get allCountries(): string[] {
		let countries = this.props.implants.map((x) => x._company?.country);
		countries = countries.filter((x, i) => countries.indexOf(x) === i);
		return countries.filter((x) => x) as string[];
	}

	get filteredImplants() {
		let all = this.props.implants;
		if (appState.search.nameFilter !== "") {
			all = this.props.implants.filter(
				(implant) =>
					implant.name
						.toLowerCase()
						.includes(appState.search.nameFilter.toLowerCase()) ||
					implant._company?.company
						.toLowerCase()
						.includes(appState.search.nameFilter.toLowerCase())
			);
		}

		if (appState.search.selectedFeatures.length > 0) {
			let featureGroup1 = appState.search.selectedFeatures
				.filter((x) => x.key.includes("__"))
				.map((x) => x.key.split("__")[1].replace(/_/g, " "));
			let featureGroup2 = appState.search.selectedFeatures
				.filter((x) => !x.key.includes("__"))
				.filter((x) => x.key.length > 2)
				.map((x) => x.key.replace(/_/g, " "));
			let featureGroup3 = appState.search.selectedFeatures
				.filter((x) => !x.key.includes("__"))
				.filter((x) => x.key.length < 3)
				.map((x) => x.text.toLowerCase());
			let allFeatures = featureGroup1
				.concat(featureGroup2)
				.concat(featureGroup3);
			all = all.filter((implant) => {
				for (let index = 0; index < allFeatures.length; index++) {
					const feature = allFeatures[index];
					if (
						!JSON.stringify(implant.feature).toLowerCase().includes(feature) &&
						!JSON.stringify(implant.type).toLowerCase().includes(feature) &&
						!JSON.stringify(implant._company?.country)
							.toLowerCase()
							.includes(feature)
					) {
						return false;
					}
				}
				return true;
			});
		}

		return all;
	}

	get limitedImplants() {
		return this.filteredImplants.slice(0, appState.search.slice);
	}

	keyToIcon(key: string) {
		return key.length > 2
			? "./features/" + key + ".svg"
			: `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${key}.svg`;
	}

	render(): ReactNode {
		return (
			<div className="search-page">
				<div className="search-control">
					<SearchBox
						placeholder="Implant name filter"
						title="Search"
						value={appState.search.nameFilter}
						onChange={(_e, newValue) => {
							appState.search.slice = 30;
							appState.search.nameFilter = newValue || "";
						}}
					/>
					<ComboBox
						componentRef={(ref) => {
							this.features = ref;
						}}
						options={[
							{
								key: "platform",
								text: "Head",
								itemType: DropdownMenuItemType.Header,
							},
							{ key: "head_microthreads__yes", text: "Microthreads present" },
							{ key: "head_shape__angled", text: "Angled head shape" },
							{ key: "head_shape__flared", text: "Flared head shape" },
							{ key: "head_shape__straight", text: "Straight head shape" },
							{ key: "head_shape__wide", text: "Wide head shape" },

							{
								key: "body",
								text: "Body",
								itemType: DropdownMenuItemType.Header,
							},
							{ key: "body_shape__straight", text: "Straight body shape" },
							{ key: "body_shape__tapered", text: "Tapered body shape" },
							{
								key: "body_shape__tapered_apex",
								text: "Tapered apex body shape",
							},
							{ key: "body_threads__buttress", text: "Buttress Threads" },
							{ key: "body_threads__no_threads", text: "No threads" },
							{
								key: "body_threads__reverse_buttress",
								text: "Reverse buttress threads",
							},
							{ key: "body_threads__square", text: "Square threads" },
							{ key: "body_threads__rounded", text: "Rounded threads" },
							{ key: "body_threads__v_shaped", text: "V-shaped threads" },

							{
								key: "apex",
								text: "Apex",
								itemType: DropdownMenuItemType.Header,
							},
							{ key: "apex_grooves__yes", text: "Grooves present in apex" },
							{ key: "apex_hole__oblong", text: "Oblong apex hole" },
							{ key: "apex_hole__round", text: "Round hole" },
							{ key: "apex_shape__cone", text: "Cone apex shape" },
							{ key: "apex_shape__dome", text: "Dome apex shape" },
							{ key: "apex_shape__flared", text: "Flared apex shape" },
							{ key: "apex_shape__flat", text: "flat apex shape" },

							{
								key: "connection",
								text: "Connection",
								itemType: DropdownMenuItemType.Header,
							},
							{ key: "connection_type__external", text: "External connection" },
							{ key: "connection_type__internal", text: "Internal connection" },
							{
								key: "connection__internal_bevel",
								text: "Internal bevel connection",
							},
							{
								key: "connection__morse_taper",
								text: "Morse taper connection",
							},
							{
								key: "connection_shape__triangle",
								text: "Triangle connection shape",
							},
							{
								key: "connection_shape__square",
								text: "Square connection shape",
							},
							{
								key: "connection_shape__pentagon",
								text: "Pentagon connection shape",
							},
							{
								key: "connection_shape__hexagon",
								text: "Hexagon connection shape",
							},
							{
								key: "connection_shape__octagon",
								text: "Octagon connection shape",
							},
							{
								key: "connection_shape__tri_lobe",
								text: "Three lobe connection shape",
							},
							{
								key: "connection_shape__three_spline",
								text: "Three spline connection shape",
							},
							{
								key: "connection_shape__four_lobe",
								text: "Four lobe connection shape",
							},
							{
								key: "connection_shape__four_spline",
								text: "Four Spline connection shape",
							},
							{
								key: "connection_shape__five_lobe",
								text: "Five lobe connection shape",
							},
							{
								key: "connection_shape__six_lobe",
								text: "Six lobe connection shape",
							},
							{
								key: "connection_shape__six_spline",
								text: "Six spline connection shape",
							},
							{
								key: "connection_shape__eight_lobe",
								text: "Eight lobe connection shape",
							},
							{
								key: "connection_shape__eight_spline",
								text: "Eight spline connection shape",
							},

							{
								key: "placement",
								text: "Placement level",
								itemType: DropdownMenuItemType.Header,
							},
							{ key: "level__bone_level", text: "Bone level placement" },
							{ key: "level__tissue_level", text: "Tissue level placement" },

							{
								key: "material",
								text: "Material",
								itemType: DropdownMenuItemType.Header,
							},
							{
								key: "material__cp_titanium",
								text: "Commercially pure titanium",
							},
							{ key: "material__titanium_alloy", text: "Titanium alloy" },
							{ key: "material__zirconia", text: "Zirconia" },

							{
								key: "type",
								text: "Type",
								itemType: DropdownMenuItemType.Header,
							},
							{ key: "standard", text: "Standard two piece" },
							{ key: "one_piece", text: "One piece" },
							{ key: "zygomatic", text: "Zygomatic" },

							{
								key: "country",
								text: "Country",
								itemType: DropdownMenuItemType.Header,
							},
						].concat(
							this.allCountries
								.map((country) => ({
									key: countryCode(country),
									text: country,
								}))
								.sort((a, b) => a.text.localeCompare(b.text))
						)}
						onRenderOption={(option) => {
							return (
								<div className="feature-filter">
									<img
										className="icon"
										src={this.keyToIcon(option?.key as string)}
									></img>
									<span> {option?.text}</span>
								</div>
							);
						}}
						multiSelect
						selectedKey={appState.search.selectedFeatures.map((x) => x.key)}
						onChange={(_e, option) => {
							appState.search.slice = 30;
							if (option?.selected)
								appState.search.selectedFeatures.push({
									key: option?.key as string,
									text: option?.text as string,
								});
							else {
								appState.search.selectedFeatures =
									appState.search.selectedFeatures.filter(
										(x) => x.key !== option?.key
									);
							}
						}}
					/>

					<div
						onClick={() => {
							this.features?.focus(true);
						}}
						className="tag-picker-container"
					>
						{appState.search.selectedFeatures.length === 0 && (
							<div className="label">
								<Icon iconName="filter"></Icon>Implant feature filter
							</div>
						)}
						<TagPicker
							className="tag-picker"
							onResolveSuggestions={() => []}
							selectedItems={appState.search.selectedFeatures.map((x) => ({
								key: x.key,
								name: x.text,
							}))}
							onRenderItem={(props) => {
								return (
									<div key={props.key} className="selected-feature">
										<img
											className="feature-icon"
											src={this.keyToIcon(props.item.key as string)}
										></img>{" "}
										<span className="feature-name">{props.item.name}</span>{" "}
										<Icon
											onClick={(e) => {
												appState.search.selectedFeatures =
													appState.search.selectedFeatures.filter(
														(x) => x.key !== props.item.key
													);
												e.stopPropagation();
											}}
											imageProps={{ src: "./icons/tag-cross.svg" }}
										></Icon>
									</div>
								);
							}}
							disabled={true}
							inputProps={{
								placeholder:
									appState.search.selectedFeatures.length === 0
										? "Select features"
										: "",
							}}
						></TagPicker>
					</div>
					<div className="top-text">
						{this.limitedImplants.length === 0 ? (
							<div>No implants found</div>
						) : (
							<div>
								Showing {this.limitedImplants.length} of{" "}
								{this.filteredImplants.length} implants
							</div>
						)}
					</div>
				</div>

				<div className="list">
					{this.limitedImplants.map((item) => (
						<Card key={item._id} item={item} />
					))}
					{this.limitedImplants.length === 0 && (
						<div className="no-implant-found">
							<span>
								<FontIcon iconName="error"></FontIcon>
							</span>
							<div>No implants found</div>
						</div>
					)}
				<span className="show-more-button">
					{this.limitedImplants < this.filteredImplants ? (
						<span>
							<a
								onClick={() => {
									appState.search.slice += 30;
								}}
							>
								<ChevronDown></ChevronDown> {" Show more"}
							</a>
						</span>
					) : (
						""
					)}
				</span>
				</div>
			</div>
		);
	}
}
