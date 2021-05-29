import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// swtich wraps route, route wraps
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;
 
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>  {
      // this.setState({currentUser: user})
      // createUserProfileDocument(userAuth);
      // console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data());
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          // console.log(this.state);
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const currentUser = this.state;
    return (
      <div className="App">
        {/* <HomePage /> */}
        {/* Header outside of the switch so it always appears regardless of navigation */}
        <Header currentUser={currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
          {/* <Route exact path='/topics' component={TopicList} /> */}
          {/* <Route path='/topics/:topicId' component={TopicDetail} /> */}
        </Switch> 
      </div>
    );
  }
}

export default App;
