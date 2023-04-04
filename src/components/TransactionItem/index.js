import './index.css'

const TransactionItem = props => {
  const {transactionObject, onDeleteButton} = props
  const {id, title, amount, amountType} = transactionObject
  const onDelete = () => {
    onDeleteButton(id)
  }

  return (
    <li className="transaction-item">
      <p className="transaction-title">{title}</p>
      <p className="transaction-amount">Rs {amount}</p>
      <p className="transaction-type">{amountType}</p>
      <div>
        <button
          className="delete-button"
          type="submit"
          data-testid="delete"
          onClick={onDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            className="delete-image"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
