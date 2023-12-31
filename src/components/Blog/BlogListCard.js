/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DynamicMetaTags from "../../utils/DynamicMetaTags";

class BlogListCard extends React.Component {
  handleCLick = (postId) => {
    this.props.history.push(`/blogdetails/${postId}`);
  };
  render() {
    const {
      FileArray = [],
      HeaderText,
      Details,
      postId,
      detailsPage = false,
      category = [],
    } = this.props;

    const fileType = FileArray[0].fileType;
    const fileUrl = FileArray[0].fileUrl;

    return (
      <>
        <DynamicMetaTags
          pageTitle="Blog Details"
          pageDescription="This is the home page of our website."
        />
        <div className="card single_post">
          <div className="body">
            <div className="img-post">
              {fileType.includes("video") && (
                <video className="d-block img-fluid" controls>
                  <source src={fileUrl} />
                </video>
              )}
              {fileType.includes("image") && (
                <img
                  className="d-block img-fluid"
                  src={fileUrl}
                  alt="First slide"
                />
              )}
              {fileType.includes("youtube") && (
                <iframe
                  width="560"
                  height="315"
                  src={fileUrl }
                  title="YouTube video player"
                  frameorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  controls
                ></iframe>
              )}
            </div>
            <h3>
              <a href="blogdetails">{HeaderText}</a>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: Details }} />
          </div>
          <div className="footer">
            {detailsPage ? (
              <div className="actions">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => this.props.history.push(`/blognewpost`)}
                >
                  Update Post
                </button>
              </div>
            ) : (
              <div className="actions">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    this.handleCLick(postId);
                  }}
                >
                  Continue Reading
                </button>
              </div>
            )}
            <ul className="stats">
              <li>
                <a
                // onClick={}
                >
                  {category[0]}
                </a>
              </li>
              {/* <li>
              <a className="icon-heart">28</a>
            </li>
            <li>
              <a className="icon-bubbles">128</a>
            </li> */}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default withRouter(connect(mapStateToProps, {})(BlogListCard));
