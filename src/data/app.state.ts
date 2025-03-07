import { makeAutoObservable } from "mobx";

class State {
	nameSearch = {
		v: "",
		setNameSearch(input: string) {
			this.v = input;
		},
	};

	search = {
		nameFilter: "",
		selectedFeatures: [] as {key: string, text: string}[],
		slice: 30,
	};

	infoModalOpen = false;

	login = {
		token: localStorage.getItem("token") || "",
		open: false,
		email: "",
		code: "",
		loading: false,
		step: 0,
		invalidEmail: false,
		invalidCode: false,
		errorOccurred: false,
		get isLoggedIn() {
			return !!this.loggedUser;
		},
		get heading() {
			if (this.loggedUser) return "Welcome, " + this.loggedName + "!";
			return this.step === 0 ? "Enter your email" : "Verify your code";
		},
		get subHeading() {
			if (this.loggedUser) return "You are logged in.";
			return this.step === 0
				? "Use your email to login or register a new account."
				: "Enter the code that has been sent to your email.";
		},
		get primaryText() {
			if (this.loggedUser) return "Logout";
			return this.step === 0 ? "Verify" : "Login";
		},
		get loggedUser() {
			if (this.token === "") return null;
			try {
				return JSON.parse(atob(this.token)).payload;
			} catch (error) {
				return null;
			}
		},
		get loggedName() {
			return this.loggedUser?.name || null;
		},
		get loggedEmail() {
			return this.loggedUser?.email || null;
		},
		submit() {
			if (this.loading) return;
			if (this.loggedUser) {
				this.logout(false);
			} else if (this.step === 0) this.login1();
			else if (this.step === 1) this.login2();
		},
		async login1() {
			this.invalidEmail =
				!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
			if (this.invalidEmail) return;
			this.loading = true;

			let res = "null";

			try {
				res = await (
					await fetch("https://auth.implantsdb.com", {
						method: "PUT",
						body: JSON.stringify({
							operation: "login",
							email: this.email,
						}),
					})
				).text();
			} catch (error) {
				this.loading = false;
				this.errorOccurred = true;
				return;
			}

			if (res === "null") {
				this.loading = false;
				this.errorOccurred = true;
				return;
			}

			this.loading = false;
			this.step = 1;
			this.errorOccurred = false;
		},
		async login2() {
			this.invalidCode = !/^[a-z]{6}$/i.test(this.code);
			if (this.invalidEmail) return;
			this.loading = true;

			let res = "";
			try {
				res = await (
					await fetch("https://auth.implantsdb.com", {
						method: "PUT",
						body: JSON.stringify({
							operation: "login2",
							email: this.email,
							code: this.code,
						}),
					})
				).text();
			} catch (error) {
				this.loading = false;
				this.errorOccurred = true;
				return;
			}

			if (res === "" || res === "null") {
				this.loading = false;
				this.errorOccurred = true;
				return;
			}

			this.loading = false;
			this.errorOccurred = false;
			this.token = JSON.parse(res);
			localStorage.setItem("token", JSON.parse(res));
		},
		logout(close: boolean) {
			if (close) this.open = false;
			this.step = 0;
			this.email = "";
			this.code = "";
			this.invalidEmail = false;
			this.invalidCode = false;
			this.errorOccurred = false;
			this.token = "";
			localStorage.removeItem("token");
		},
	};

	// TODO: Implement back/forward button using history
	router = {
		history: [""],
		currentPage: "",
		swipe: "",
		resetScroll() {
			window.scrollTo(0, 0);
			document.querySelectorAll(".app main.page")[0].scrollTo(0, 0);
			window.scrollTo(0, 0);
			document.querySelectorAll(".app main.page")[0].scrollTo(0, 0);
		},
		navigate(page: string) {
			this.swipe = "right";
			this.history.push(this.currentPage);
			this.currentPage = page;
			this.resetScroll();
			appState.search.slice = 30;
		},
		goBack() {
			this.swipe = "left";
			this.currentPage = this.history.pop() || "";
			this.resetScroll();
		},
	};
	constructor() {
		makeAutoObservable(this);
	}
}

export const appState = new State();
