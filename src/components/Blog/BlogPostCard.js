import React from "react";
import { connect } from "react-redux";
import JoditEditor from "jodit-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactS3 from "react-s3";

class BlogPostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "", // Add a description state to store the editor content
      userFile: [], // Add a file state to store the selected file
    };
  }
  postData = async () => {
    try {
      const { description, userFile } = this.state;
      const blogTitle = document.getElementById("blogTitle").value; // Get the blog title from the input field
      const category = document.getElementById("category").value; // Get the selected category

      if (userFile) {
        let fileArray = [];

        for (const singleFile of userFile) {
          const config = {
            bucketName: "mif-bucket",
            region: "ap-south-1",
            accessKeyId: "AKIAQPOZMTKKXS7QDAGZ",
            secretAccessKey: "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",
          };

          const awsResponse = await ReactS3.uploadFile(singleFile, config);
          const fileSizeKb = singleFile.size / 1024;
          const fileSizeMb = fileSizeKb / 1024;

          if (awsResponse.location !== "") {
            const fileObj = {
              fileSize: fileSizeMb,
              fileName: singleFile.name,
              fileType: singleFile.type,
              fileUrl: awsResponse.location,
            };

            fileArray.push(fileObj);
          } else {
            throw new Error("AWS Upload Error");
          }
        }

        const obj = {
          title: blogTitle,
          category: category,
          description: description,
          files: fileArray,
        };
        const response = await axios.post(
          "http://localhost:5000/api/post/create",
          obj
        );
        if (response) {
          console.log(response,"Resspifhasf");
          this.props.history.push(`/blogdetails/${response.data._id}`);
        } else {
          throw new Error("Mongo DB Upload Error");
        }
      } else {
        throw new Error("Please Upload an Image");
      }
    } catch (error) {
      // ALERT ERROR
      console.log(error);
    }
  };

  isMediaFile = (file) => {
    const mediaTypes = [
      "audio/mp3",
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    return mediaTypes.includes(file.type);
  };

  handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (this.isMediaFile(file)) {
      this.setState({ userFile: event.target.files });
    } else {
      document.getElementById("fileUpload").reset();
      window.alert("Invalid file type");
    }
  };

  handleEditorChange = (content) => {
    this.setState({ description: content }); // Update the description state with the editor content
  };

  render() {
    return (
      <div className="card">
        <div className="body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Blog title"
              id="blogTitle"
            />
          </div>
          <select className="form-control show-tick" id="category">
          <option>Select Category</option>
            <option>Articles</option>
            <option>Brand</option>
            <option>Interview</option>
            <option>Trending</option>
            <option>Feature</option>
            <option>Magzine</option>
            <option>Product</option>
          </select>
          <div className="form-group m-t-20 m-b-20">
            <input
              accept="audio/*,video/*,image/*"
              type="file"
              className="form-control-file"
              id="fileUpload"
              multiple
              aria-describedby="fileHelp"
              onChange={this.handleFileChange} // Call handleFileChange when the file input changes
            />
            <small id="fileHelp" className="form-text text-muted">
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </small>
          </div>
          <JoditEditor
            value={this.state.description}
            config={{ readonly: false }}
            tabIndex={1}
            onBlur={(text) => this.handleEditorChange(text)} // Call handleEditorChange when the editor content changes
            // onChange={(text) => this.handleEditorChange(text)} // Call handleFileChange when the file input changes
          />
          <button
            type="button"
            className="btn btn-block btn-primary m-t-20"
            onClick={this.postData}
          >
            Post
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({
  isEventModal: mailInboxReducer.isEventModal,
});

export default withRouter(connect(mapStateToProps, {})(BlogPostCard));
