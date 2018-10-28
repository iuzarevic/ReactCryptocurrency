import React from 'react';
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
        }

        this.handleChange = this.handleChange.bind(this);
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
            console.log(result);
            this.setState({loading: false});
        })  
    }

    render() {
        const {loading} = this.state;
        return (
            <div className="Search">
                {/*<input ref={(input) => {this.searchQuery = input}} /> */}
                <span className="Search-icon"></span>
                <input 
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    onChange={this.handleChange}
                />
                {loading &&
                    <div className="Search-loading">
                        <Loading width='12px' height='12px' />
                    </div>
                }
            </div>
        );
    }
}

export default Search;