import React from 'react'

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Grid from '@material-ui/core/Grid';

import ProductCard from '../com/ProductCard'

class Home extends React.Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            loading: true,
            products: [],
        }

        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.responseHandler = this.responseHandler.bind(this)
        this.renderProducts = this.renderProducts.bind(this)
    }

    componentDidMount() {
        this.loadDataFromApi()
    }

    loadDataFromApi() {

        // let { viewId, id } = this.props
        const viewId = 962; // Inventory

        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        api.getView(viewId, { start: 0, max: 15000 }).then(this.responseHandler)

        console.log('Load data from API, view Id: ', viewId)

    }

    responseHandler(results) {
        const data = results.data
        this.setState({ products: data, loading: false }, () => {
            // console.log(this.state)
        })
    }

    renderProducts() {
        const { products } = this.state
        return products.map(item => {
            return <Grid item key={item['Record ID']}><ProductCard data={item} /></Grid>
        })
    }

    render() {
        return (
            <Grid container justify="center" spacing={24} style={{margin: 0, backgroundColor:'#cfcfcf'}}>
                {this.renderProducts()}
            </Grid>
        )
    }
}

export default Home