import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/createStore';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import { AppRouter } from './router';
import './App.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true
    };
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }
  handleMenuToggle() {
    this.setState({ showMenu: !this.state.showMenu });
  }
  render() {
    const { showMenu } = this.state;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Router>
              <Header handleMenuToggle={this.handleMenuToggle} />
              <div
                className={`container ${showMenu ? 'container__margin' : ''}`}
              >
                <Sidebar
                  showMenu={showMenu}
                  handleMenuToggle={this.handleMenuToggle}
                />
                <AppRouter />
              </div>
            </Router>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
