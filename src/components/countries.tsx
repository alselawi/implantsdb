import { Component } from "react";
import { countryCode } from "../utils";
import { Company } from "../data/db";
import "./style.countries.scss";
import { appState } from "../data/app.state";

export class Countries extends Component<{companies: Company[]}> {
    get countries() {
        const countries = new Map();
        this.props.companies.forEach((company) => {
            const country = company.country;
            if (country) {
                countries.set(country, (countries.get(country) || 0) + 1);
            }
        });
        return Array.from(countries.entries()).sort((a, b) => b[1] - a[1]);
    }

    render() {
        return (
            <div className="countries">
                <div className="heading">Implants by Country</div>
                <div className="list">
                    {this.countries.map((country) => (
                        <div key={country[0]} className="item" onClick={()=>{
                            appState.search.selectedFeatures = [{
                                key: countryCode(country[0]),
                                text: country[0]
                            }];
                            appState.router.navigate(`search`);
                        }}>
                            <div className="flag">
                                <img
                                    src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode(
                                        country[0]
                                    )}.svg`}
                                    alt={country[0]}
                                />
                            </div>
                            <div className="count">
                                {country[1]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}