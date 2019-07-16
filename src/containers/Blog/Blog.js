import React, { Component, Suspense } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

import './Blog.css'
import PostList from 'containers/Blog/PostList/PostList'
import FullPost from 'containers/Blog/FullPost/FullPost'

// // load component async
// import asyncComponent from 'hoc/asyncComponent'
// const NewPost = asyncComponent(() => {
//   // import keyword as function as dynamic import syntax
//   // whatever come in the parentheses is only imported when the arrow function is executed
//   return import('containers/Blog/NewPost/NewPost');
// });

// hoc or
// N.B. This only works on client side application
const NewPost = React.lazy(() => import('containers/Blog/NewPost/NewPost'));

class Blog extends Component {
  render () {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li><NavLink exact to='/'>Home</NavLink></li>
              <li><NavLink to='/new-post'>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path='/' exact component={PostList} />
          {/*<Route path='/new-post' component={NewPost} />*/}
          <Route path='/new-post'
                 render={() => (
                   <Suspense fallback={<div>Loading...</div>}>
                     <NewPost />
                   </Suspense>
                 )} />
          <Route path='/:id' component={FullPost} />
        </Switch>
      </div>
    )
  }
}

export default Blog;