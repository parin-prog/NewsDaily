import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';



export default class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=93bb2f28585942749cbbb8b22b89b493&page=1&pageSize=5';
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, loading: false});
  }

  async handlePrev(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=93bb2f28585942749cbbb8b22b89b493&page=${this.state.page - 1}&pageSize=5`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, page: this.state.page - 1});
    this.setState({articles: parsedData.articles, loading: false});
  }

  async handleNext(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=93bb2f28585942749cbbb8b22b89b493&page=${this.state.page + 1}&pageSize=5`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, page: this.state.page + 1});
    this.setState({articles: parsedData.articles, loading: false});
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>NewsDaily - Top Headlines</h2>
        
        <div className='row'>
        {this.state.articles.map((e)=>{
          return <div className='col-md-3'>
            <NewsItem key={e.url} title={e.title?e.title.slice(0, 85):""} desc={e.description?e.description.slice(0, 98):''} imageUrl={e.urlToImage} newsUrl={e.url} />
            </div>
        })}
        </div>
        {this.state.loading && <Spinner />}
        <div className='container' style={{textAlign: 'center'}}>
          <a href='/' onClick={this.handlePrev} className="btn btn-sm btn-primary">&larr; Previous</a>
          <a href='/' onClick={this.handleNext} className="btn btn-sm btn-primary">Next &rarr;</a>
        </div>
        </div>
    )
  }
}

