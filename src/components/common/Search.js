import React from 'react';
import {withRouter} from 'react-router-dom';
import Loading from './Loading';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import './Search.css';


class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            searchQuery: '',
            searchResults: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(event) {
        const searchQuery = event.target.value;

        this.setState({searchQuery});

        //dont send ajax request!!!
        if(!searchQuery) {
            return '';
        }

        this.setState({loading: true});
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then((result) => {
            this.setState({
                loading: false,
                searchResults: result,
            });
        })
    }

    //handleRedirect method
    handleRedirect(currencyId) {
        //clear input values and close autocomplete container, by clearing searchQuery state
        this.setState({
            searchQuery: '',
            searchResults: [],
        });

        this.props.history.push(`/currency/${currencyId}`);
    }

    renderSearchResults() {
        const {searchResults, searchQuery, loading} = this.state;

        if(!searchQuery) {
            return '';
        }

        if(searchResults.length > 0) {
            return(
                <div className="Search-result-container">
                    {searchResults.map(result => (
                        <div 
                            key={result.id} 
                            className="Search-result"
                            onClick={() => this.handleRedirect(result.id)}
                            value
                        >
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            );
        }

        if(!loading) {
            return(
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found.
                    </div>
                </div>
            );
        }

    }

    render() {
        const {loading, searchQuery} = this.state;
        return (
            <div className="Search">
                {/*<input ref={(input) => {this.searchQuery = input}} /> */}
                <span className="Search-icon"></span>
                <input 
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    onChange={this.handleChange}
                    value = {searchQuery}
                />
                {loading &&
                    <div className="Search-loading">
                        <Loading width='12px' height='12px' />
                    </div>
                }

                {this.renderSearchResults()}
            </div>
        );
    }
}

export default  withRouter(Search);