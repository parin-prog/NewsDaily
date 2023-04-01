import React, { Component } from 'react'
import './NewsItem.css'

export default class NewsItem extends Component {
  render() {
    let {title, desc, imageUrl, newsUrl, author, date, source} = this.props;

    return (
        <div className="xcard" id='card' style={{width: "20rem"}}>
          <div className='position-relative'>
          <img src={!imageUrl?'https://kennegee.files.wordpress.com/2013/10/news.jpg':imageUrl} className="card-img-top" alt="..." style={{width:'100%',height:'200px'}}/>
          <span id='badge' className="position-absolute top-100 start-50 translate-middle badge rounded-pill bg-warning">
          {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          </div>
          <div className="card-body position-relative">
          
            <h5 className="card-title my-2">{title} ...</h5>
            <p className="card-text">{desc} ...</p>
            <p className="card-text2"><small className="text-muted">By {author} on {new Date(date).toDateString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-sm btn-primary">Read more</a>
          </div>
          
        </div>
    )
  }
}
