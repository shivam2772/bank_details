import React from 'react';
import { FaStar } from 'react-icons/fa';
import { connect } from 'react-redux';

const BankDetail = props => {
  const { bank_name, ifsc, branch, bank_id, address, isFav } = props.bankDetail;
  return (
    <div className="bank-detail">
      <h2>Bank Detail</h2>
      <div className="bank-detail__container">
        {isFav ? <FaStar size="22" color="#FFEB3B" /> : null}
        <div className="bank-detail__namecontainer">
          <p>Bank Name: {bank_name}</p>
          <p>IFSC: {ifsc}</p>
          <p>Branch: {branch}</p>
          <p>Bank ID: {bank_id}</p>
          <p>Address: {address}</p>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  bankDetail: state.bankDetail
});
export default connect(mapStateToProps, null)(BankDetail);
