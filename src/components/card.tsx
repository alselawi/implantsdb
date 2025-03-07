import { Component } from "react";
import "./style.card.scss";
import { Implant } from "../data/db";
import { appState } from "../data/app.state";

export class Card extends Component<{
	item: Implant;
}> {
	colors = [
		"#F44336",
		"#E91E63",
		"#9C27B0",
		"#673AB7",
		"#3F51B5",
		"#2196F3",
		"#03A9F4",
		"#00BCD4",
		"#009688",
		"#4CAF50",
		"#8BC34A",
		"#CDDC39",
		"#FFEB3B",
		"#FFC107",
		"#FF9800",
		"#FF5722",
		"#795548",
		"#9E9E9E",
		"#607D8B",
	];
	render() {
		return (
			<article
				className="implant-card"
				onClick={() =>
					appState.router.navigate("implant:" + this.props.item._id)
				}
			>
				<div
					className="background"
					style={{ backgroundImage: `url(${this.props.item.imgs[0]})` }}
				></div>
				<div
					className="overlay"
					style={{
						background: `linear-gradient(to bottom, ${
							this.colors[Math.floor(Math.random() * this.colors.length)]
						}, rgba(0, 0, 0, 1))`,
					}}
				></div>
				<div className="content">
					<h5>{this.props.item.name}</h5>
					<p>{this.props.item._company?.company}</p>
				</div>
			</article>
		);
	}
}
