import { Component, ReactNode } from "react";
import { Implant } from "../data/db";
import "./style.classification.scss";
import { appState } from "../data/app.state";

const features: { niceName: string; searchName: string; img: string }[] = [
	{
		niceName: "Standard",
		searchName: "standard",
		img: "standard.svg",
	},
	{
		niceName: "Zygomatic",
		searchName: "zygomatic",
		img: "zygomatic.svg",
	},
	{
		niceName: "One-piece",
		searchName: "one_piece",
		img: "one-piece.svg",
	},
];

export class Classification extends Component<{ implants: Implant[] }> {
	render(): ReactNode {
		return (
			<div className="classification">
				{features.map((feature) => {
					let num = this.props.implants.filter((x) => {
						x._catalogs = [];
						return JSON.stringify({ type: x.type, features: x.feature })
							.toLowerCase()
							.includes(feature.niceName.toLowerCase());
					}).length;
					return (
						<div key={feature.img} className="feature" onClick={()=>{
							appState.search.selectedFeatures = [{
								key: feature.searchName,
								text: feature.niceName
							}];
							appState.router.navigate("search");
						}}>
							<img src={`/classification/${feature.img}`} />
							<div className="title">{feature.niceName}</div>
							<div className="number">{num}</div>
						</div>
					);
				})}
			</div>
		);
	}
}
