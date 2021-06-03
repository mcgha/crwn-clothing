import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// swtich wraps route
import { connect } from 'react-redux'; 
import { setCurrentUser } from './redux/user/user.actions';
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends Component {
  unsubscribeFromAuth = null;
 
  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>  {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    // const currentUser = this.props;
    return (
      <div className="App">
        {/* <HomePage /> */}
        {/* Header outside of the switch so it always appears regardless of navigation */}
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
            this.props.currentUser ? (
            <Redirect to='/' />
            ) : (<SignInAndSignUpPage />)
            }
            />
        </Switch> 
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
