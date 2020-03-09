import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { MdHome, MdClose } from 'react-icons/md';
import './sidebar.scss';

class SideBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderListView = this.renderListView.bind(this);
  }

  renderListView(link, text, Icon, color = '') {
    // const {
    //   location: { pathname }
    // } = this.props;
    return (
      <Link to={link}>
        <div
          className={`sidebar__list ${
            'hello' === link ? 'sidebar__list__selected' : ''
          }`}
        >
          <Icon size="22" color={color} />
          <h3 className="sidebar__list__heading">{text}</h3>
        </div>
      </Link>
    );
  }
  render() {
    const { showMenu, handleMenuToggle } = this.props;
    return (
      <div
        className={`sidebar ${
          showMenu ? 'sidebar__width' : 'sidebar__transform'
        }`}
      >
        <div className="sidebar__header">
          <h2>Banks</h2>
          <button
            onClick={() => handleMenuToggle()}
            className="sidebar__header__close__btn"
          >
            <MdClose size="22" />
          </button>
        </div>
        {this.renderListView('/', 'Home', MdHome)}
        {this.renderListView('/fav', 'Favroutes', FaStar, '#FFEB3B')}
      </div>
    );
  }
}

export default withRouter(SideBar);
