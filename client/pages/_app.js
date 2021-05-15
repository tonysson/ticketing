// LOADING GLOBAL CSS 
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/Header';


// context === {req, res} => Page Component getInitialProps
// context === {Component , ctx: {req, res}} => Custom App Component getInitialProps

const AppComponent =  ({Component , pageProps , currentUser}) => {
    return (
        <div>
          <Header currentUser ={currentUser} />
          <Component {...pageProps}  />
        </div>
    )
}

AppComponent.getInitialProps = async (appContext) => {
    // console.log(Object.keys(appContext)) => appTree , ctx , Component , router;
    const client  = buildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser');

    let pageProps = {} ;
    if(appContext.Component.getInitialProps){
        pageProps  = await appContext.Component.getInitialProps(appContext.ctx)
    }
    return {
        pageProps ,
       ...data
    }
}

export default AppComponent