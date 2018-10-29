import React from 'react';
import './Detail.css';
import { handleResponse, renderChangePercent } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';

class Detail extends React.Component {

    constructor() {
        super();

        this.state = {
            currency: {},
            loading: false,
            error: null,
        }
    }

    componentDidMount() {
        const currencyId = this.props.match.params.id;
        //console.log('currencyId',currencyId);
        this.fetchCurrency(currencyId);

    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            const newCurrencyId = this.props.match.params.id;
            this.fetchCurrency(newCurrencyId);
        }
    }

    fetchCurrency(currencyId) {
        this.setState({loading: true});

        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then((currency) => {
                //console.log('currency', currency);
                this.setState({
                    loading: false,
                    error: null,
                    currency,
                });
            })
            .catch((error) => {
                //console.log('error', error);
                this.setState({ 
                    loading: false, 
                    error: error.errorMessage 
                });

            });
    }

    render() {
        const { loading, error, currency } = this.state;
        //console.log('currency', currency);
        //render only when our app still loading data
        if(loading) {
            return <div className="loading-container"><Loading /></div>
        }

        //render only error message
        if(error) {
            return <div className="error">{error}</div>
        }
        return(
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.name} ({currency.symbol})
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {currency.price}</span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value">{currency.rank}</span>
                    </div>
                    <div className="Detail-item">
                        24H change <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market cap</span>
                        <span className="Detail-dollar">$</span>
                        {currency.marketCap}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">24h Volume</span>
                        <span className="Detail-dollar">$</span>
                        {currency.volume24h}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Total supply</span>
                        {currency.totalSupply}
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;