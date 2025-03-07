import { Component, ReactNode } from "react";
import { Brands } from "./brands";
import { Company } from "../data/db";
export class PageCompanies extends Component<{
    companies: Company[];
}> {
    render(): ReactNode {
        return (
            <div>
                <Brands
                    companies={this.props.companies}
                    num={9999999}
                    title="All companies"
                    showCompanyName={true}
                ></Brands>
            </div>
        );
    }
}