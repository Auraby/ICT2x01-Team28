import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyContext = createContext();

export const MyConsumer = MyContext.Consumer;

export class MyProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "1902619@sit.singaporetech.edu.sg",
			role: "",
			name: "",
			user_id: "1902619",
			modules: [],
			apiUrl: "http://localhost:8000",
			/* apiUrl: "https://api.ict2x01.xxhamster.org", */
		};
	}

	changeState = (event) => {
		const newState = event.currentTarget.getAttribute("data-value");

		this.setState({
			myState: newState,
		});
	};

	logout = () => {
		this.setState({
			email: "",
			role: "",
			name: "",
			user_id: "",
			modules: [],
		});
	};

	login = (user) => {
		this.setState(
			{
				email: user.email,
				role: user.role,
				name: user.name,
				user_id: user.user_id,
				modules: user.modules,
			},
			() => {
				this.successToast("Successfully logged in");
			}
		);
	};

	successToast = (message) => {
		toast.success(message, {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	infoToast = (message) => {
		toast.info(message, {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	warningToast = (message) => {
		toast.warn(message, {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	errorToast = (message) => {
		toast.error(message, {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	render() {
		return (
			<MyContext.Provider
				value={{
					state: this.state,
					logout: this.logout,
					login: this.login,
					apiUrl: this.state.apiUrl,
					infoToast: this.infoToast,
					warningToast: this.warningToast,
					successToast: this.successToast,
					errorToast: this.errorToast,
				}}
			>
				{this.props.children}
				<ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			</MyContext.Provider>
		);
	}
}
