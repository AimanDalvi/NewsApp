import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,publishedAt,source}=this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <div style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute',right: '0'}}>
        <span className=" badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img src={imageUrl?imageUrl:"http://www.middleweb.com/wp-content/uploads/2017/08/breaking-news-blue-600.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
         <h5 className="card-title">{title} </h5>    
         <p className="card-text">{description}.</p>
            <p className='card-text'><small className='text-muted'>By {author?author:"unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark ">Read me</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
