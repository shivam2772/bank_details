import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { setOrderdData } from '../header/action';
import { addToFav, removeFromFav, setBankDetail } from './action';
import { create1Dto2DArr } from '../header/saga';
import './home.scss';

export const TableRow = ({
  id,
  name,
  ifsc,
  branch,
  address,
  favBanks,
  handleFavClick,
  bankData,
  handleNameClick
}) => {
  const isFav = favBanks.filter(item => item.ifsc === ifsc).length
    ? true
    : false;
  return (
    <tr>
      <td className="bank-name">
        {isFav ? (
          <button onClick={() => handleFavClick(bankData, 'remove')}>
            <FaStar size="22" color="#FFEB3B" />
          </button>
        ) : (
          <button onClick={() => handleFavClick(bankData, 'add')}>
            <FaRegStar size="22" color="#FFEB3B" />
          </button>
        )}{' '}
        <button onClick={() => handleNameClick(bankData, isFav)}>{name}</button>
      </td>
      <td>{ifsc}</td>
      <td>{branch}</td>
      <td>{id}</td>
      <td>{address}</td>
    </tr>
  );
};

export const renderTableRow = (
  arrData,
  favBanks,
  handleFavClick,
  handleNameClick
) => {
  return arrData.map((bankData, index) => {
    const { ifsc, branch, address, bank_name, bank_id } = bankData;
    return (
      <TableRow
        key={index}
        name={bank_name}
        ifsc={ifsc}
        branch={branch}
        id={bank_id}
        address={address}
        favBanks={favBanks}
        handleFavClick={handleFavClick}
        bankData={bankData}
        handleNameClick={handleNameClick}
      />
    );
  });
};

const BanksListView = props => {
  const [numOfRows, setNumOfRows] = useState({ value: 10, label: '10' });
  const [currentPage, setCurrentPage] = useState(0);
  const rowOptions = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' }
  ];

  const handleRowChange = option => {
    const { fnSetOrderedData, orderedData } = props;
    if (option.value !== orderedData.data[0].length) {
      fnSetOrderedData(create1Dto2DArr(props.bankList.data, option.value));
    }
    setNumOfRows(option);
  };

  const handleNameClick = (data, isFav) => {
    const { fnSetBankDetail } = props;
    const obj = { isFav };
    fnSetBankDetail({ ...data, ...obj });
    console.log(props);
    props.history.push(`/detail/:${data.ifsc}`);
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
    if (props.orderedData.data.length) {
      if (props.category.length && props.searchVal.length) {
        const filterData = props.orderedData.data[
          currentPage
        ].filter(bankData =>
          bankData[props.category]
            .toLowerCase()
            .includes(props.searchVal.toLowerCase())
        );
        console.log('FILTERED DATA: ', filterData);
        if (filterData.length) {
          return renderTableRow(
            filterData,
            props.favBank,
            handleFavClick,
            handleNameClick
          );
        } else {
          return (
            <tr>
              <td>No search result</td>
            </tr>
          );
        }
      } else {
        return renderTableRow(
          props.orderedData.data[currentPage],
          props.favBank,
          handleFavClick,
          handleNameClick
        );
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
      {props.orderedData.data.length ? (
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
            {currentPage * 10 + 1}-{(currentPage + 1) * numOfRows.value} of{' '}
            {props.orderedData.data.length}
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
                currentPage < props.orderedData.data.length
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
          <h4>Slect any city for results</h4>
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
  fnSetOrderedData: data => dispatch(setOrderdData(data)),
  fnRemoveFromFav: data => dispatch(removeFromFav(data)),
  fnAddToFav: data => dispatch(addToFav(data)),
  fnSetBankDetail: data => dispatch(setBankDetail(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BanksListView);
