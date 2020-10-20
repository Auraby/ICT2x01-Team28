import React from 'react';
import { MyContext } from '../context/myContext';

export default class Home extends React.Component {
    static contextType = MyContext;

    render() {
        return (
            <>
                <h1>TEST </h1>
            </>
        )
    }
}