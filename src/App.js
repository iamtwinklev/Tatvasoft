import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import appStyle from './AppStyle.module.css'
import { ThemeProvider } from '@emotion/react';
import { theme } from './Styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainNavigation from './components/MainNavigation';
import Footer from './components/footer';
import Header from './components/header';
import { AuthWrapper } from './context/auth';
import { CartWrapper } from './context/cart';

function App() {
  return (
    <>
      <Router>
        <AuthWrapper>
          <CartWrapper>
            <ThemeProvider theme={theme}>
              <ToastContainer />
              {/* <Button>font-size: 1rem</Button> */}
              {/* <img src={Logo} alt="app logo"/> */}
              {/* <img src="http://localhost:3000/logo192.png" alt="app logo"/> */}
              {/* <img src={`${process.env.REACT_APP_HOSTED_URL}logo192.png`} alt="app logo"/> */}
              {/* <div className='navbar-style'> */}
              {/* <div style={{display: "flex", padding: 5, columnGap: 10}}> */}
              {/* <div style={{...globalStyles.navbar}}> */}
              <div className={appStyle.navbarStyle}>
                {/* <Link to="/homepage">Home</Link> */}
                {/* <Link to="/apple">Apple</Link> */}
                {/* <Link to="/Register">Register</Link> */}
                {/* <Link to="/register">Register</Link> */}
                {/* <Link to="/applet">Applet</Link> */}
              </div>
              <Header />
              <main>
                <MainNavigation />
              </main>
              <Footer />
              {/* <Route path='/product-list' Component={ProductList}/> */}
              {/* <Route path='/homepage' Component={HomePage}/>
          <Route path='/apple' Component={Apple}/>
          <Route path='*' Component={NotFound}/> */}
            </ThemeProvider>
          </CartWrapper>
        </AuthWrapper>
      </Router>
    </>
  );
}

export default App;
