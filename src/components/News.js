import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import './News.css'
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93bb2f28585942749cbbb8b22b89b493&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
  }

  async handlePrev(){
    this.setState({loading: true});
    console.log(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93bb2f28585942749cbbb8b22b89b493&pageSize=${this.props.pageSize}&page=${this.state.page-1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, page: this.state.page - 1});
  }

  async handleNext(){    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93bb2f28585942749cbbb8b22b89b493&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, page: this.state.page + 1});
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>NewsDaily - Top Headlines</h2>
        
          {this.state.loading && <Spinner />}
        <div className='row'>
        {this.state.articles.map((e)=>{
          return <div className='col-md-3' key={e.url}>
            <NewsItem title={e.title?e.title.slice(0, 105):""} desc={e.description?e.description.slice(0, 108):''} imageUrl={e.urlToImage} newsUrl={e.url} />
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between my-3">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
                <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
        </div>
    )
  }
}

