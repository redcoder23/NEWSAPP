import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


console.log(process.env.REACT_APP_API_KEY);

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    func = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("hello i am a constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.func(this.props.category)}-NewsMonkey`;
    }
    async handleevents() {    
        this.props.setprogress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setprogress(30);
        let parseddata = await data.json();
        this.props.setprogress(70);
        console.log(parseddata);
        this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false });
        this.props.setprogress(100);
    }
    async componentDidMount() {
        this.setState()
        this.handleevents();

    }
    handleprevclick = async () => {
        // if (this.state.page <= 1) return; 
        this.setState({ page: this.state.page - 1 });
        this.handleevents();
    }

    handlenextclick = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
        //     return; // Don't go past last page
        // }
        this.setState({ page: this.state.page + 1 })
        this.handleevents();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true }); /* 
        // we set this loading to false so that while it fetches the data it doesnt show the spinner rather use the 
        // loading of the  infinite scroll*/
        let data = await fetch(url);
        let parseddata = await data.json();
        // console.log(parseddata);
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults,
            loading: false
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>
                    {`NewsMonkey ${this.props.category} - headline`}
                </h1>

                {/* <Spinner/> */}
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <Newsitem
                                            title={element.title ? element.title.slice(0, 45) : ""}
                                            description={element.description ? element.description.slice(0, 88) : ""}
                                            imageurl={element.urlToImage}
                                            newsurl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                        <button
                            disabled={this.state.page <= 1}
                            type="button"
                            className="btn btn-primary"
                            onClick={this.handleprevclick}
                        >
                            &larr; Previous page
                        </button>
                        <button
                            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                            type="button"
                            className="btn btn-success"
                            onClick={this.handlenextclick}
                        >
                            Next page &rarr;
                        </button>
                    </div> */}
            </>
        );
    }
}

export default News
