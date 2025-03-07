import { Component, ReactNode } from "react";
import { Modal } from "@carbon/react";
import { observer } from "mobx-react";
import { appState } from "../data/app.state";

@observer
export class InfoModal extends Component {
	render(): ReactNode {
		return (
			<Modal
				modalHeading={<img src="logo.png" width={150}></img>}
				modalLabel="About this app"
				secondaryButtonText="Close"
				primaryButtonDisabled
				open={appState.infoModalOpen}
				onRequestClose={() => (appState.infoModalOpen = false)}
				size="xs"
			>
				<p>
					A comprehensive dental implant reference app designed to assist
					dentists in identifying and selecting the right implants for their
					patients.
					<br />
					Featuring an extensive database of nearly all dental implant
					companies, the app provides detailed product information, high-quality
					images, and downloadable catalogs. A key feature of ImplantsDB is its
					ability to help dentists identify implant brands using the search and
					filtering feature.
				</p>
				<p>
					Curated and developed by Dr. <i>Ali A. Saleem</i> in Mosul, Iraq, this app
					serves as an invaluable tool for dental professionals seeking quick
					and reliable implant insights.
				</p>
			</Modal>
		);
	}
}
