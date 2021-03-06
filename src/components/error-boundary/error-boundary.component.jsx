import React from 'react';

import { 
    ErrorImageOverlay, 
    ErrorImageContainer, 
    ErrorImageText 
} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error) {
        ///process error
        return { hasErrored: true };
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if(this.state.hasErrored) {
            return (
                <ErrorImageOverlay >
                    <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png'/>
                    <ErrorImageText>An error has occured...We are working to get this fixed please try again later.</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        //if no error return children as normal
        return this.props.children;
    }
}

export default ErrorBoundary;