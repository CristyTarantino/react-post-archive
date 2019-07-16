import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Post from 'components/Post/Post'

class PostList extends Component {
  state = {
    posts: []
  };

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id})
  };

  postRemovedHandler = (id) => {
    if (this.state.selectedPostId === id) {
      this.setState({selectedPostId: null})
    }

    this.setState(prevState => {
      return {posts: prevState.posts.filter(item => item.id !== id)}
    });
  };

  postAddedHandler = (post) => {
    this.setState(prevState => {
      return {posts: [...prevState.posts, post]}
    });
  };

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        console.log(response.data);
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        });
        this.setState({posts: updatePosts});
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ hasErrors: true })
      });
  }

  render() {
    let postList = <p style={{textAlign: 'center'}}>Somethng went wrong</p>;

    if ( !this.state.hasErrors) {
      postList = this.state.posts.map(post => {
        return <Link to={'/' + post.id}
                     key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            deleteClicked={() => this.postRemovedHandler(post.id)}
            clicked={() => this.postSelectedHandler(post.id)}/>
        </Link>
      });
    }

    return (
        <section className="PostList">
          {postList}
        </section>
    );
  }
}

export default PostList