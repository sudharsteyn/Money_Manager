import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {
    transactionId,
    transactionTitle,
    transactionAmount,
    transactionType,
  } = transactionDetails
  const onDelete = () => {
    deleteTransaction(transactionId)
  }
  return (
    <li className="transaction-info">
      <p className="transaction-detail">{transactionTitle}</p>
      <p className="transaction-detail">Rs {transactionAmount}</p>
      <p className="transaction-detail">{transactionType}</p>
      <button
        data-testid="delete"
        onClick={onDelete}
        className="delete-btn"
        type="button"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
