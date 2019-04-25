import React, {Component} from 'react';

import './NewPost.css';

import axios from 'axios';

class NewPost extends Component {
  emptyState = {
    title: '',
    body: '',
    author: 'Max'
  };
  
  state = {
    title: '',
    body: '',
    author: 'Max'
  };
  
  postDataHandler = () => {
    if (JSON.stringify(this.emptyState) !== JSON.stringify(this.state)) {
      const data = {...this.state};
      
      axios.post('https://jsonplaceholder.typicode.com/posts', data)
        .then(response => {
          this.props.addNewClicked({...response.data});
          this.setState({...this.emptyState});
        })
    }
  };
  
  render() {
    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
          <label>Title</label>
          <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}/>
          <label>Content</label>
          <textarea rows="4" value={this.state.body} onChange={(event) => this.setState({body: event.target.value})}/>
          <label>Author</label>
          <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
            <option value="Max">Max</option>
            <option value="Manu">Manu</option>
          </select>
          <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;