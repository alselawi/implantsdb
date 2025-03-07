import { Component } from "react";
import "./style.popular-brands.scss";
import { Company } from "../data/db";
import { appState } from "../data/app.state";
import { DefaultButton, Label } from "@fluentui/react";

export class Brands extends Component<{
	title?: string;
	showMore?: boolean;
	companies: Company[];
	num: number;
	showCompanyName?: boolean;
}> {
	popularBrands: Company[] = [];
	constructor(props: { companies: Company[]; num: number; title?: string }) {
		super(props);
		this.popularBrands = this.props.companies
			.sort(
				(a, b) =>
					b._implants
						.filter((x) => x)
						.map((x) => (x.imgs || []).length)
						.reduce((n, i) => {
							n = n + i;
							return n;
						}, 0) -
					a._implants
						.filter((x) => x)
						.map((x) => (x.imgs || []).length)
						.reduce((n, i) => {
							n = n + i;
							return n;
						}, 0)
			)
			.slice(0, this.props.num);
	}
	render() {
		return (
			<div className="popular-brands">
				<Label>{this.props.title || "Popular brands"}</Label>
				<div className="brands">
					{this.popularBrands.map((brand) => (
						<div>
							<div
								className="brand"
								key={brand._id}
								onClick={() => appState.router.navigate("company:" + brand._id)}
							>
								<img src={brand.logo} alt={brand.company} />
							</div>
							{this.props.showCompanyName && (
								<div className="company-name">{brand.company}</div>
							)}
						</div>
					))}
				</div>
				{this.props.showMore && (
					<DefaultButton
						kind="tertiary"
						iconProps={{ iconName: "more" }}
						onClick={() => appState.router.navigate("companies")}
					>
						More brands
					</DefaultButton>
				)}
			</div>
		);
	}
}
