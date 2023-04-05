import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import './News.css'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { useEffect } from 'react';


const News = (props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  
 const capitalize = (a)=>{
    return a.charAt(0).toUpperCase()+a.slice(1);
  }
  
  useEffect(() => {
    updateNews();
    document.title = `${capitalize(props.category)} - NewsDaily`;
      // eslint-disable-next-line
  }, []);

   const updateNews = async() =>{
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(45);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
   }

  //  handlePrev = async()=>{
  //   setState({loading: true, page: page - 1});
  //   updateNews();
  // }

  //  handleNext = async()=>{
  //   setState({loading: true, page: page + 1});
  //   updateNews();
  // }

  const fetchMoreData = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setPage(page+1);
  }

    return (
      <>
        <h2 className='container my-3'>NewsDaily - Top Headlines</h2>

        <InfiniteScroll
            dataLength={articles.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={'.. '}
            >
              
        <div className='container my-2'>
        <div className='row'>
        {articles.map((e)=>{
          return <div className='col-md-3' key={e.url}>
            {!loading && <NewsItem title={e.title?e.title.slice(0, 105):""} desc={e.description?e.description.slice(0, 108):''} imageUrl={e.urlToImage} newsUrl={e.url} 
                  author={e.author} date={e.publishedAt} source={e.source.name}/>}
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {loading && <Spinner />}
        
        {/* {!loading && <div className="container d-flex justify-content-between my-3">
                <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrev}> &larr; Previous</button>
                <button disabled={page>=Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div>} */}
        </>
    )
  
}

News.defaultProps = {
  country: 'in',
  category: 'general',
  pageSize: 20
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default News;