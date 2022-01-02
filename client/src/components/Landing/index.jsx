import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";

import { ModalProvider } from "../../context/ModalContext";

import "./style.scss";

function index() {
	return (
		<ModalProvider>
			<Navbar />
			<Hero />
		</ModalProvider>
	);
}

export default index;
