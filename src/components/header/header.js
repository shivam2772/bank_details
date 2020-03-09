import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { MdMenu } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import { bankListFetchRequest, setCategory, setSearchValue } from './action';
import './header.scss';

const Header = props => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const cityOptions = [
    { value: 'MUMBAI', label: 'Mumbai' },
    { value: 'DELHI', label: 'Delhi' },
    { value: 'BANGALORE', label: 'Bangalore' },
    { value: 'KOLKATA', label: 'Kolkata' },
    { value: 'CHENNAI', label: 'Chennai' }
  ];

  const categoryOptions = [
    { value: 'bank_name', label: 'Bank' },
    { value: 'ifsc', label: 'IFSC' },
    { value: 'branch', label: 'Branch' }
  ];

  const handleCitySelect = option => {
    const { fnBankListCall } = props;
    fnBankListCall({ query: option.value });
    setSelectedCity(option);
  };

  const handleCategorySelect = option => {
    const { fnSetCategory } = props;
    fnSetCategory({ category: option.value });
    setSelectedCategory(option);
  };

  const handleInputChange = e => {
    const { fnSetSearchVal } = props;
    if (e.target.value.length > 2 || e.target.value.length === 0) {
      fnSetSearchVal({ val: e.target.value });
    }
    setInputVal(e.target.value);
  };
  console.log('HEADER PROPS: ', props);
  return (
    <header className="header">
      <div className="header__left">
        <button className="icon" onClick={() => props.handleMenuToggle()}>
          <MdMenu size={20} color="white" />
        </button>
        <h2>{props.location.pathname === '/' ? 'Home' : 'Favourite'}</h2>
        <input
          className="search__input d--mobile"
          type="search"
          name="search"
          placeholder="Search..."
          value={inputVal}
          onChange={e => handleInputChange(e)}
        />
      </div>
      <div className="header__right">
        {props.location.pathname === '/' ? (
          <Select
            value={selectedCity}
            onChange={option => handleCitySelect(option)}
            options={cityOptions}
            placeholder="Select City"
            className="select_dropdown"
          />
        ) : null}
        <Select
          value={selectedCategory}
          onChange={option => handleCategorySelect(option)}
          options={categoryOptions}
          placeholder="Select Category"
          className="select_dropdown"
        />
        <input
          className="search__input d--desktop"
          type="search"
          name="search"
          placeholder="Search..."
          value={inputVal}
          onChange={e => handleInputChange(e)}
        />
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  searchVal: state.searchVal.val || ''
});

const mapDispatchToProps = dispatch => ({
  fnBankListCall: data => dispatch(bankListFetchRequest(data)),
  fnSetCategory: data => dispatch(setCategory(data)),
  fnSetSearchVal: data => dispatch(setSearchValue(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
