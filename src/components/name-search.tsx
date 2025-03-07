import { Tag, ExpandableSearch } from "@carbon/react";
import { Component, ReactNode } from "react";
import { Implant } from "../data/db";
import "./style.name-search.scss";
import { countryCode } from "../utils";
import { appState } from "../data/app.state";
import { observer } from "mobx-react";

@observer
export class NameSearch extends Component<
	{
		all: Implant[];
	}
> {
	get filtered(): Implant[] {
		const res: Implant[] = [];
		const search = appState.nameSearch.v.toLowerCase().split(" ");
		for (let index = 0; index < this.props.all.length; index++) {
			if (res.length === 100) break;
			const element = this.props.all[index];
			const name = element.name.toLowerCase();
			const company = element._company?.company.toLowerCase();
			if (
				search.every((word) => name.includes(word) || company?.includes(word))
			) {
				res.push(element);
			}
		}
		return res;
	}
	render(): ReactNode {
		return (
			<div className="name-search">
				<ExpandableSearch
					labelText="Search"
					size="lg"
					value={appState.nameSearch.v}
					onChange={(e) => {
						appState.nameSearch.setNameSearch(e.target.value);
					}}
					isExpanded={appState.nameSearch.v.length > 0}
				/>
				<div
					className="results"
					style={{ height: appState.nameSearch.v ? "calc(100vh - 96px)" : "0" }}
				>
					{this.filtered.length && appState.nameSearch.v.length > 0 ? (
						<div className="results-inner">
							<div className="heading">
								Search Results {this.filtered.length}:
							</div>
							{this.filtered.map((item) => (
								<div
									className="item"
									key={item._id}
									onClick={() => {
										appState.nameSearch.setNameSearch("");
										appState.router.navigate("implant:" + item._id);
									}}
								>
									<div
										className="img"
										style={{
											backgroundImage: `url(${item.imgs[0]})`,
										}}
									></div>
									<div className="text">
										<span className="company-name">
											<img
												src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode(
													item._company?.country || ""
												)}.svg`}
											></img>{" "}
											{item._company?.company}
										</span>
										<a className="implant-name">{item.name}</a>
										<Tag
											type={
												item.type === "zygomatic"
													? "magenta"
													: item.type.includes("mini")
													? "green"
													: item.type.includes("One")
													? "cyan"
													: "cool-gray"
											}
										>
											{item.type} Implant
										</Tag>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="no-results">
							{this.filtered.length === 0 ? (
								<p>No results found for "{appState.nameSearch.v}".</p>
							) : (
								""
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}
