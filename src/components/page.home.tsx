import { Component, ReactNode } from "react";
import { Brands } from "./brands";
import { PopularImplants } from "./implants";
import { Classification } from "./classification";
import { Countries } from "./countries";
import { Company, Implant } from "../data/db";
export class PageHome extends Component<{
	implants: Implant[];
	companies: Company[];
}> {
	render(): ReactNode {
		return (
			<div>
				<Classification implants={this.props.implants}></Classification>
				<PopularImplants
					implants={this.props.implants}
					num={24}
				></PopularImplants>
				<Brands
					companies={this.props.companies}
					num={24}
					showMore={true}
				></Brands>
				<Countries companies={this.props.companies}></Countries>
			</div>
		);
	}
}
