import React from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../context/myContext';

export default class Navbar extends React.Component {
    static contextType = MyContext;

    render () {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-0 navbar-shadow">
                <ul className="navbar-nav mr-auto py-0">
                    <li className="nav-item active">
                        <a className="nav-link bitcarry-logo" href="/home"><span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className={"nav-link px-3"} data-key="currency" data-value="BTC">
                            <img src={process.env.PUBLIC_URL + 'bitcoin.png'} width="20" height="20" alt="BTC" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className={"nav-link px-3"} data-key="currency" data-value="ETH">
                            <img src={process.env.PUBLIC_URL + 'ethereum.png'} width="20" height="20" alt="ETH" />
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <div className="custom-control custom-switch mt-1">
                        <label  className="text-white mr-5" htmlFor="SwitchDB">MySQL</label>
                        <input type="checkbox" className="custom-control-input" id="SwitchDB" onClick={this.context.changeDatabase}/>
                        <label className="custom-control-label text-white" htmlFor="SwitchDB">NoSQL</label>
                    </div>
                </ul>
            </nav>
        )
    }
}