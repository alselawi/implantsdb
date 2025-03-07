import { Component } from "react";
import { Catalog } from "../data/db";
import { Document, Page } from "react-pdf";
import { appState } from "../data/app.state";
import { ProgressBar } from "@carbon/react";
import { useInView } from "react-intersection-observer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./style.page.catalog.scss";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const LazyLoadPDFPage = ({ pageNumber }: { pageNumber: number }) => {
	const { ref, inView } = useInView({
		triggerOnce: true, // Load the page only once
		threshold: 0.1, // Adjust as necessary
	});

	return (
		<div ref={ref} style={{ margin: "10px 0" }}>
			{inView ? (
				<Page pageNumber={pageNumber} width={window.innerWidth} />
			) : (
				<div style={{ height: "842px" }} />
			)}
		</div>
	);
};

export class PageCatalog extends Component<{ catalog: Catalog }> {
	state = {
		base64: null,
		pageNumber: 1,
	};

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		try {
			const blob = await (
				await fetch(this.props.catalog.url, {
					headers: [["Authorization", `${appState.login.token}`]],
				})
			).blob();

			const base64String = await this.blobToBase64(blob);
			this.setState({ base64: base64String });
		} catch (error) {
			console.error("Failed to fetch and convert blob:", error);
		}
	}

	blobToBase64 = (blob: Blob): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result as string;
				resolve(result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	};

	render() {
		return (
			<div className="catalog-page">
				{
					<div>
						{this.state.base64 ? (
							<div style={{ overflow: "auto", maxHeight: "100vh" }}>
								<TransformWrapper
									panning={{
										disabled: true,
									}}
									wheel={{
										wheelDisabled: true,
									}}
                                    
								>
									<TransformComponent>
										<Document
											file={this.state.base64}
											onLoadSuccess={({ numPages }) => {
												this.setState({ pageNumber: numPages });
											}}
										>
											{Array.from(
												new Array(this.state.pageNumber),
												(_el, index) => (
													<LazyLoadPDFPage
														key={`page_${index + 1}`}
														pageNumber={index + 1}
													/>
												)
											)}
										</Document>
									</TransformComponent>
								</TransformWrapper>
							</div>
						) : (
							<ProgressBar label="Loading PDF" />
						)}
					</div>
				}
			</div>
		);
	}
}
