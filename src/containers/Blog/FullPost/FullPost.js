import React, {Component} from 'react';

import './FullPost.css';

import axios from 'axios';

class FullPost extends Component {
  state = {
    loadedPost: null,
    hasError: false
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      hasError: false
    });
  }

  componentDidMount(prevProps, prevState, snapshot) {
    if (this.props.match.params.id) {
      if (!this.state.hasError && (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id))) {
        axios.get('/posts/' + this.props.match.params.id)
          .then(response => {
            this.setState({ loadedPost: response.data });
          })
          .catch(() => {

            this.setState({
              hasError: true,
              loadedPost: null
            });
          });
      }
    }
  }

  deletePostHandler = () => {
    if (this.props.match.params.id) {
      if (this.state.loadedPost) {
        axios.delete('/posts/' + this.props.match.params.id)
          .then(response => {
            this.props.deleteClicked(this.props.match.params.id);

            this.setState({
              loadedPost: null
            });
          });
      }
    }
  };

  render() {
    let post = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

    if (!this.state.hasError) {
      post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    }

    if (this.props.match.params.id && !this.state.hasError) {
      post = <p style={{textAlign: 'center'}}>Loading!</p>;
    }

    if (this.state.loadedPost && !this.state.hasError) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>
      );
    }

    return post;

  }
}

export default FullPost;