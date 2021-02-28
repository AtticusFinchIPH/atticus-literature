import React, { useMemo, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';
import translation from '../locales';
import { lightTheme, darkTheme } from '../utils/theme';
import ThemeContext from '../contexts/ThemeContext';
import CartOpenContext from '../contexts/CartOpenContext';
import RedirectOpenContext from '../contexts/RedirectOpenContext';
import NavBar from './features/NavBar';
import CartBar from './features/CartBar';
import RedirectBar from './features/RedirectBar';
import CopyRight from './features/CopyRight';
import Home from './pages/Home';
import Product from './pages/Product';
import Bookstore from './pages/Bookstore';
import Checkout from './pages/Checkout';
import OrderProcess from './pages/OrderProcess';
import AboutUS from './pages/AboutUs';
import PageNotFound from './pages/PageNotFound';

function App() {
  const language = useSelector(state => state.language);
  const [isDarkMode, setDarkMode] = useState(false);
  const themeValue = useMemo(() => ({isDarkMode, setDarkMode}), [isDarkMode, setDarkMode]);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [isCartOpen, setCartOpen] = useState(false);
  const cartOpenValue = useMemo(() => ({isCartOpen, setCartOpen}), [isCartOpen, setCartOpen]);
  const [isRedirectOpen, setRedirectOpen] = useState(false);
  const redirectOpenValue = useMemo(() => ({isRedirectOpen, setRedirectOpen}), [isRedirectOpen, setRedirectOpen]);
  return (
    <BrowserRouter>
      <IntlProvider locale={language} messages={translation[language]}>
        <ThemeProvider theme={theme}>   
          <ThemeContext.Provider value={themeValue}>  
          <CartOpenContext.Provider value={cartOpenValue}>
          <RedirectOpenContext.Provider value={redirectOpenValue}>

            <NavBar />
            <CartBar />
            <RedirectBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/product/:id" component={Product} />
              <Route path="/bookstore/" component={Bookstore} />
              <Route path="/about_us/" component={AboutUS} />
              <Route path="/checkout/" component={Checkout} />
              <Route path="/order_process/" component={OrderProcess} />
              <Route component={PageNotFound} />
            </Switch>
            <CopyRight />

            </RedirectOpenContext.Provider>
          </CartOpenContext.Provider>
          </ThemeContext.Provider>
        </ThemeProvider>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
