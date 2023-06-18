import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props
  return (
    <div className="money-info-container">
      <div className="money-card balance">
        <img
          className="money-manager-icons"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="money-info">
          <p className="title">Your Balance</p>
          <p data-testid="balanceAmount" className="money">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="money-card income">
        <img
          className="money-manager-icons"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
        />
        <div className="money-info">
          <p className="title">Your Income</p>
          <p data-testid="incomeAmount" className="money">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="money-card expenses">
        <img
          className="money-manager-icons"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="money-info">
          <p className="title">Your Expenses</p>
          <p data-testid="expensesAmount" className="money">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
