import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            currencies : [],
            error: null,
            totalPages: 0,
            page: 1,
            scrolly:0,
        };

        //binding component defined by this keyword with method we use in class to access component state
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    componentDidUpdate() {
        window.scroll(0,this.state.scrolly);
    }

    fetchCurrencies() {
        //this is how you update state of component, need to be carreful wehen using it.
        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, totalPages} = data;
            this.setState({
                currencies,
                totalPages,
                loading: false,
            });
        })
        .catch((error) => {
            this.setState({
                error: error.errorMessage,
                loading: false
            });
        });        
    }

    handlePaginationClick(direction){
        let nextPage = this.state.page;
        //Increment nextPage only when direction is next, if isn't then decrease value of nextPage by 1
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
        this.setState({ page: nextPage, scrolly:window.scrollY }, () => {
            //we need to make sure that currencies are fetched after udpating page
            this.fetchCurrencies();
        });
    }

    render() {
        const {loading, error, currencies, page, totalPages} = this.state;
        // rendering only loading component if loading variable is true
        if (loading) {
            return <div className="loading-container"><Loading/></div>
        }
        // rendering only message error if error occurs during fetching data
        if (error) {
            return <div className="error">{error}</div>
        }
        return (
            <div>
                <Table 
                    currencies = {currencies}
                />
                <Pagination
                    page = {page}
                    totalPages = {totalPages}
                    handlePaginationClick = {this.handlePaginationClick}
                />
            </div>
        )
    }
}

export default List;