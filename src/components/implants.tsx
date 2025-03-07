import { Component } from "react";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Card } from "./card";
import { Implant } from "../data/db";


export class PopularImplants extends Component<{implants: Implant[], num: number}> {
	render() {
		return (
			<div className="popular-implants">
				<div className="heading">Popular Implants</div>
				<div className="list">
					<ScrollingCarousel>
						{this.props.implants
							.sort((a, b) => (b.imgs || []).length - (a.imgs || []).length)
							.slice(0, this.props.num)
							.map((item) => (
								<Card key={item._id} item={item} />
							))}
					</ScrollingCarousel>
				</div>
			</div>
		);
	}
}
