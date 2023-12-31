import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import BlogListCard from "../../components/Blog/BlogListCard";
import SearchCard from "../../components/Blog/SearchCard";
import BlogAdsCard from "../../components/Blog/BlogAdsCard";
import BlogCommentCard from "../../components/Blog/BlogCommentCard";
import BlogReplyCard from "../../components/Blog/BlogReplyCard";
import {
  blogDetailsCardData,
  blogAdsCardData,
  componentCardData,
} from "../../Data/BlogData";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DynamicMetaTags from "../../utils/DynamicMetaTags";

class BlogDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      description: "",
      file: [],
      category: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const { match } = this.props;
    const postId = match.params.postId;

    axios
      .get(`http://localhost:5000/api/post/${postId}`)
      .then((response) => {
        console.log(response, "Sfdafsafasf");
        this.setState({
          _id: response.data.post._id,
          title: response.data.post.title,
          description: response.data.post.description,
          file: response.data.post.media,
          category: response.data.post.category,
          isLoading: false
        });
      })
      .catch(() => {
        console.log("Error");
      });
  }

  render() {
    const { _id, title, description, file, category, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <>
      <DynamicMetaTags
      pageTitle={this.state.title}
      pageDescription={this.state.description}
    />
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Blog Details"
              Breadcrumb={[
                { name: "Blog", navigate: "" },
                { name: "Blog Details", navigate: "" },
              ]}
            />

            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 left-box">
                <BlogListCard
                  FileArray={file}
                  HeaderText={title}
                  Details={description}
                  postId={_id}
                  category={category}
                  detailsPage={true}
                />
                <BlogCommentCard
                  HeaderText={componentCardData.HeaderText}
                  CommentsList={componentCardData.CommentsList}
                />
                <BlogReplyCard />
              </div>
              <div className="col-lg-4 col-md-12 left-box">
                <SearchCard />
                {blogAdsCardData.map((data, i) => {
                  return (
                    <BlogAdsCard
                      key={`${i}` + "OUSHDOIGHSO"}
                      HeaderText={data.HeaderText}
                      RefLink={data.RefLink}
                      PostList={data.PostList}
                      ImageList={data.ImageList}
                      EmailFeedbackBar={data.EmailFeedbackBar}
                      HeaderDetails={data.HeaderDetails}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default withRouter(connect(mapStateToProps, {})(BlogDetails));
