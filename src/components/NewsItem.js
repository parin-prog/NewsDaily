import React, { Component } from 'react'
import './NewsItem.css'

export default class NewsItem extends Component {
  render() {
    let {title, desc, imageUrl, newsUrl} = this.props;

    return (
        <div className="card" id='card' style={{width: "20rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." style={{width:'100%',height:'200px'}}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
    )
  }
}
