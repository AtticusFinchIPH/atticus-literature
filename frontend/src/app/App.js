import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';
import translation from '../locales';
import { lightTheme, darkTheme } from '../utils/theme';
import NavBar from './features/NavBar';
import CopyRight from './features/CopyRight';
import Home from './pages/Home';

function App() {
  const language = useSelector(state => state.language);
  const isDarkMode = useSelector(state => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <BrowserRouter>
      <IntlProvider locale={language} messages={translation[language]}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <CopyRight />
        </ThemeProvider>
        </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
