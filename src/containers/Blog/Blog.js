import React, {Component} from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from '../../axios';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    hasErrors: false
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
        this.setState({ hasErrors: true })
      });
  }
  
  postSelecteHandler = (id) => {
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
  
  render() {
    let posts = <p style={{textAlign: 'center'}}>Somethng went wrong</p>;
    
    if ( !this.state.hasErrors) {
      posts = this.state.posts.map(post => {
        return <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelecteHandler(post.id)}/>
      });
    }
    
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} deleteClicked={this.postRemovedHandler}/>
        </section>
        <section>
          <NewPost addNewClicked={this.postAddedHandler}/>
        </section>
      </div>
    );
  }
}

export default Blog;