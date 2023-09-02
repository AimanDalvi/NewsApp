import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async UpdateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.UpdateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  // handleNextClick=async()=>{
  //   if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
  //   }
  //   else{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e99e498d4b6492385d3cbe5b73d9d49&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data= await fetch(url);
  //   let parsedData= await data.json()
  //   this.setState({articles: parsedData.articles})
  //   this.setState({
  //     page:this.state.page+1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  //   }
  // }

  // handlePrevClick=async()=>{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e99e498d4b6492385d3cbe5b73d9d49&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data= await fetch(url);
  //   let parsedData= await data.json()
  //   this.setState({articles: parsedData.articles})
  //   this.setState({
  //     page:this.state.page-1,
  //     articles: parsedData.articles,
  //     loading:false
  //   }
  //   )

  // }

  render() {
    return (
      <>
        <h2 className=" text-center " style={{ margin: "90px 00px 45px 00px" }}> NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}  Headlines</h2> 
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element,index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItems  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
          <button type="button" disabled={this.state.page<=1  } className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
          </div> */}
      </>
    );
  }
}
