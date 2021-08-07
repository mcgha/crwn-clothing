import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// switch wraps route
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';

// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
// used to create database
// import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { selectCurrentUser } from './redux/user/user.selector';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
// used to create database
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  //only run useEffect if checkUserSession has changed
 
  // componentDidMount() {
  //   checkUserSession();

  //   // const { setCurrentUser, collectionsArray } = this.props;
  //   // used to create database 
  //     // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
  //     //call to add collections to firestore database, passing destructured vaules we want
  // }
  
  return (
    <div className="App">
      {/* <HomePage /> */}
      {/* Header outside of the switch so it always appears regardless of navigation */}
      <GlobalStyle />
      <Header/>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}> 
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route 
              exact 
              path='/signin' 
              render={() => 
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
              />
          </Suspense>
        </ErrorBoundary>
      </Switch> 
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
  // used to create objects in firestore database
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
