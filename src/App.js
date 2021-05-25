import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
// swtich wraps route, route wraps
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import ShopPage from './pages/shop/shop.component';

// const HomePageNav = (props) => {

//   return(
//     <div>
//       {/* <Link to='/topics'>Topics</Link> */}
//       <button onClick={() => props.history.push('/Shop')}>Shop</button>
//       <HomePage />
//     </div>
//   );
// };

// const TopicList = () => {
//   return ( 
//     <div>
//       <Link to='/'>Home</Link>
//       <h1>Topic List</h1>
//     </div>
//   );
//   };

//   const TopicDetail = (props) => {
//     return ( 
//       <div>
//         <h1>TopicDetail Page: {props.match.params.topicId}</h1>
//       </div>
//     );
//     };

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        {/* <Route exact path='/topics' component={TopicList} /> */}
        {/* <Route path='/topics/:topicId' component={TopicDetail} /> */}
      </Switch> 
    </div>
  );
}

export default App;
