import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';
import translation from '../locales';
import theme from '../utils/theme';
import NavBar from './features/NavBar';
import Home from './pages/Home';

function App() {
  const language = useSelector(state => state.language);
  return (
    <BrowserRouter>
      <IntlProvider locale={language} messages={translation[language]}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </ThemeProvider>
        </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
