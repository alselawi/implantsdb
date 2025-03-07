import { Component } from "react";
import { ContentSwitcher, Switch } from "@carbon/react";
import { Home, SearchAdvanced, Enterprise } from "@carbon/react/icons";
import { appState } from "../data/app.state";

export class Footer extends Component {
	render() {
		return (
			<footer className="footer-tabs">
				<ContentSwitcher
					onChange={function (to) {
						appState.router.navigate(to.name?.toString() || "home");
					}}
					selectedIndex={0}
					size="lg"
				>
					<Switch name="home">
						<Home />
						<br />
						<span>Home</span>
					</Switch>
					<Switch name={"search"}>
						<SearchAdvanced />
						<br />
						<span>Search</span>
					</Switch>
					<Switch name={"companies"}>
						<Enterprise />
						<br />
						<span>Companies</span>
					</Switch>
				</ContentSwitcher>
			</footer>
		);
	}
}
