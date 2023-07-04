import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import BlogListCard from "../../components/Blog/BlogListCard";
import SearchCard from "../../components/Blog/SearchCard";
import axios from "axios";
import { Helmet } from "react-helmet";

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogListCardData: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:5000/api/post/allposts")
      .then((response) => {
        console.log(response.data, "ASd");
        this.setState({ blogListCardData: response.data,
          isLoading: false });
      })
      .catch(() => {
        console.log("Error");
      });
  }
  render() {
    const blogListCardData = this.state.blogListCardData;
    const isLoading = this.state.isLoading;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div
        style={{ flex: 1 }}
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <Helmet>
          <title>My React App</title>
          <meta name="Shreyas" content="This is my React application." />
          <meta name="keywords" content="React, JavaScript, Web Development" />
          <meta name="author" content="Your Name" />
        </Helmet>
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Blog List"
              Breadcrumb={[
                { name: "Blog", navigate: "" },
                { name: "Blog List", navigate: "" },
              ]}
            />
            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 left-box">
                {blogListCardData.map((data, i) => {
                  console.log(data, "ASFASfasfasf");
                  return (
                    <BlogListCard
                      key={"eni" + i}
                      FileArray={data.media}
                      HeaderText={data.title}
                      Details={data.description}
                      postId={data._id}
                    />
                  );
                })}
              </div>
              <div className="col-lg-4 col-md-12 left-box">
                <SearchCard />
                {/* {blogAdsCardData.map((data, i) => {
                  return (
                    <BlogAdsCard
                      key={"adszdsgs" + `${i}`}
                      HeaderText={data.HeaderText}
                      RefLink={data.RefLink}
                      PostList={data.PostList}
                      ImageList={data.ImageList}
                      EmailFeedbackBar={data.EmailFeedbackBar}
                      HeaderDetails={data.HeaderDetails}
                    />
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default (connect(mapStateToProps, {})(BlogList));
