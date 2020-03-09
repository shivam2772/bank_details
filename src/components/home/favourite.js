import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { addToFav, removeFromFav } from './action';
import { renderTableRow } from './index';
import './home.scss';

const FavBanksListView = props => {
  const [numOfRows, setNumOfRows] = useState({ value: 10, label: '10' });
  const [currentPage, setCurrentPage] = useState(0);
  const rowOptions = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' }
  ];

  const handleRowChange = option => {
    // const { fnSetOrderedData, orderedData } = props;
    // if (option.value !== orderedData.data[0].length) {
    //   fnSetOrderedData(create1Dto2DArr(props.bankList.data, option.value));
    // }
    setNumOfRows(option);
  };

  const handleFavClick = (data, action) => {
    const { fnAddToFav, fnRemoveFromFav, favBank } = props;
    if (action === 'remove') {
      // remove from fav list
      const filterFavBank = favBank.filter(bank => bank.ifsc !== data.ifsc);
      fnRemoveFromFav(filterFavBank);
    } else {
      // add to fav list
      fnAddToFav([data]);
    }
  };

  const renderTableData = () => {
    if (props.favBank.length) {
      if (props.category.length && props.searchVal.length) {
        const filterData = props.orderedData.data[
          currentPage
        ].filter(bankData =>
          bankData[props.category].includes(props.searchVal)
        );
        console.log('FILTERED DATA: ', filterData);
        if (filterData.length) {
          return renderTableRow(filterData, props.favBank, handleFavClick);
        } else {
          return (
            <tr>
              <td>No search result</td>
            </tr>
          );
        }
      } else {
        return renderTableRow(props.favBank, props.favBank, handleFavClick);
      }
    } else {
      return null;
    }
  };
  return (
    <div className="banklistview">
      <table>
        <thead>
          <tr>
            <th>Bank</th>
            <th>IFSC</th>
            <th>Branch</th>
            <th>BranchID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      {props.favBank.length ? (
        <div className="table__bottom">
          <span>Row per pages:</span>
          <Select
            value={numOfRows}
            onChange={option => handleRowChange(option)}
            options={rowOptions}
            placeholder="Select City"
            className="select_dropdown"
          />
          <span className="pages-show">
            {currentPage * 10 + 1}-
            {props.favBank.length > (currentPage + 1) * 10
              ? (currentPage + 1) * 10
              : props.favBank.length}{' '}
            of {props.favBank.length}
          </span>
          <button
            onClick={() =>
              setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)
            }
          >
            {'<'}
          </button>
          <button
            onClick={() =>
              setCurrentPage(
                currentPage < props.favBank.length
                  ? currentPage + 1
                  : currentPage
              )
            }
          >
            {'>'}
          </button>
        </div>
      ) : (
        <div className="noResults">
          <h4>No Fav Bank Selected</h4>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  bankList: state.bankList,
  searchVal: state.searchVal.val || '',
  category: state.category.category || '',
  orderedData: state.orderedData,
  favBank: state.favBank.data
});

const mapDispatchToProps = dispatch => ({
  fnRemoveFromFav: data => dispatch(removeFromFav(data)),
  fnAddToFav: data => dispatch(addToFav(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavBanksListView);
