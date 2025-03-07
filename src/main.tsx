import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import "./mods.scss";
import { Loader } from "./components/loader.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Loader />
	</React.StrictMode>
);
