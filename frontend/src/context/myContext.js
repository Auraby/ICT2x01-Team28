import React, { createContext } from 'react';

export const MyContext = createContext();

export const MyConsumer = MyContext.Consumer;

export class MyProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            role: ""
        }
    }    

    changeState = (event) => {
        const newState = event.currentTarget.getAttribute('data-value');

        this.setState({
            myState: newState
        })
    }

    logout = () => {
        this.setState({
            email: "",
            role: ""
        })
    }

    login = (email, role) => {
        this.setState({
            email: email,
            role: role,
        });
    }

    render() {
        return (
            <MyContext.Provider value={ {
                state: this.state,
                logout: this.logout,
                login: this.login
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
