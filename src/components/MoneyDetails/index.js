import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  return (
    <>
      <div className="balance-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          className="type-image"
          alt="balance"
        />
        <div className="amount-detail-card">
          <p className="type-name">Your Balance</p>
          <p className="type-amount" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="income-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          className="type-image"
          alt="income"
        />
        <div className="amount-detail-card">
          <p className="type-name">Your Income</p>
          <p className="type-amount" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="expense-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          className="type-image"
          alt="expenses"
        />
        <div className="amount-detail-card">
          <p className="type-name">Your Expenses</p>
          <p className="type-amount" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails
