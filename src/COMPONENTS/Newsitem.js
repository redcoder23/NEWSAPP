import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, description, imageurl, newsurl, author, date, source } = this.props;
        const defaultImage = "https://i.imgur.com/sMEqsui.jpg";
        const displayImage = imageurl ? imageurl : defaultImage;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex - end',
                        position: 'absolute',
                        right: '0'
                    }}>
                        <span className=" badge rounded-pill bg-success">{source}</span>
                        </div>
                        <img src={displayImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>


                            <p className="card-text"><small className="text-muted">By {!author ? "Unkown" : author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
                )
    }
}

                export default Newsitem