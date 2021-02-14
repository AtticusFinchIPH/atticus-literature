import React, { useMemo, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';
import translation from '../locales';
import { lightTheme, darkTheme } from '../utils/theme';
import ThemeContext from '../contexts/ThemeContext';
import CartOpenContext from '../contexts/CartOpenContext';
import NavBar from './features/NavBar';
import CartBar from './features/CartBar';
import CopyRight from './features/CopyRight';
import Home from './pages/Home';
import Product from './pages/Product';
import Bookstore from './pages/Bookstore';

function App() {
  const language = useSelector(state => state.language);
  const [isDarkMode, setDarkMode] = useState(false);
  const themeValue = useMemo(() => ({isDarkMode, setDarkMode}), [isDarkMode, setDarkMode]);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [isCartOpen, setCartOpen] = useState(false);
  const cartOpenValue = useMemo(() => ({isCartOpen, setCartOpen}), [isCartOpen, setCartOpen]);
  return (
    <BrowserRouter>
      <IntlProvider locale={language} messages={translation[language]}>
        <ThemeProvider theme={theme}>   
          <ThemeContext.Provider value={themeValue}>  
          <CartOpenContext.Provider value={cartOpenValue}>

            <NavBar />
            <CartBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/product/" component={Product} />
              <Route path="/products/" component={Bookstore} />
            </Switch>
            <CopyRight />

          </CartOpenContext.Provider>
          </ThemeContext.Provider>
        </ThemeProvider>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
