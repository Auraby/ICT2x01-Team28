import React, { createContext } from 'react';

export const MyContext = createContext('TEST');

export const MyConsumer = MyContext.Consumer;

export class MyProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }    

    changeState = (event) => {
        const newState = event.currentTarget.getAttribute('data-value');

        this.setState({
            myState: newState
        })
    }

    render() {
        return (
            <MyContext.Provider value={ {
                currency: this.state.myState,
                changeState: this.changeState
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
