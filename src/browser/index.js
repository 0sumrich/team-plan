// src/browser/index.js
import React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";
import mongoose from 'mongoose';

hydrate(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
