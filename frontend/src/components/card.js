import React, { Component } from 'react';

export class Card extends Component {
    render() { 
        return (
            <div className="card-container">
                <div className="card-item">
                    <img className="card-image" src={process.env.PUBLIC_URL + 'hdl.jpg'} /> 
                </div>
                <div className="card-item">
                    <div className="card-content">
                        <div className="card-title">
                            <span >Hai Di Lao</span>
                        </div>
                        <div className="card-text">
                            <span>text here</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 