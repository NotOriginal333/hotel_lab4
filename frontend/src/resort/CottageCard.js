import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // For navigation

class CottageCard extends Component {
    handleMoreInfo = () => {
        const { cottage, history } = this.props;
        // Redirect to cottage details page
        history.push(`/cottages/${cottage.id}`);
    };

    render() {
        const { cottage } = this.props;

        return (
            <div className="card">
                <div className="card-details">
                    <p className="text-title">{cottage.name}</p>
                    <p className="text-body">{cottage.category}</p>
                    <p className="text-body">Price: {cottage.price_per_night}</p>
                </div>
                <button className="card-button" onClick={this.handleMoreInfo}>
                    More info
                </button>
            </div>
        );
    }
}

export default withRouter(CottageCard);
