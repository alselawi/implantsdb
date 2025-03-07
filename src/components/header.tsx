import { Component } from "react";
import { IconButton } from "@carbon/react";
import { ArrowLeft, Home, Information } from "@carbon/react/icons";
import { InfoModal } from "./info";
import { appState } from "../data/app.state";
import { NameSearch } from "./name-search";
import { Implant } from "../data/db";

export class Header extends Component<{ implants: Implant[] }> {
	render() {
		return (
			<header className="app-header">
				<section
					className="back"
					onClick={() => {
						appState.router.history.length > 1 && appState.router.currentPage !== "home"
							? appState.router.goBack()
							: ""
					}}
				>
					<IconButton
						disabled={appState.router.history.length <= 1 && appState.router.currentPage === "home"}
						label="back"
						kind="ghost"
					>
						{appState.router.history.length > 1 && appState.router.currentPage !== "home" ? <ArrowLeft /> : <Home />}
					</IconButton>
				</section>
				<section className="logo">
					<img src="./logo.png"></img>
				</section>
				<section className="search">
					<NameSearch all={this.props.implants} />
				</section>
				<section className="user">
					<IconButton
						label="about"
						kind="ghost"
						onClick={() => (appState.infoModalOpen = true)}
					>
						<Information />
					</IconButton>
					<InfoModal />
				</section>
			</header>
		);
	}
}
