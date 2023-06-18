import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  onTypeChange = event => {
    this.setState({type: event.target.value})
  }

  addTransaction = () => {
    const {title, amount, type} = this.state
    let {balance, income, expenses} = this.state
    const newTransaction = {
      transactionId: v4(),
      transactionTitle: title,
      transactionAmount: amount,
      transactionType: type,
    }
    if (type === 'INCOME') {
      income += parseInt(amount)
      balance += parseInt(amount)
    } else if (type === 'EXPENSES') {
      expenses += parseInt(amount)
      balance -= parseInt(amount)
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
      balance,
      income,
      expenses,
    }))
  }

  showTransactionItems = transactionList =>
    transactionList.map(eachTransaction => (
      <TransactionItem
        deleteTransaction={this.deleteTransaction}
        key={eachTransaction.transactionId}
        transactionDetails={eachTransaction}
      />
    ))

  deleteTransaction = id => {
    const {transactionList} = this.state
    let {balance, income, expenses} = this.state
    const deletedTransaction = transactionList.find(
      eachTransaction => eachTransaction.transactionId === id,
    )
    if (deletedTransaction.transactionType === 'INCOME') {
      income -= parseInt(deletedTransaction.transactionAmount)
      balance -= parseInt(deletedTransaction.transactionAmount)
    } else if (deletedTransaction.transactionType === 'EXPENSES') {
      expenses -= parseInt(deletedTransaction.transactionAmount)
      balance += parseInt(deletedTransaction.transactionAmount)
    }
    this.setState({
      transactionList: transactionList.filter(
        eachTransaction => eachTransaction.transactionId !== id,
      ),
      balance,
      income,
      expenses,
    })
  }

  render() {
    const {
      title,
      amount,
      type,
      transactionList,
      balance,
      income,
      expenses,
    } = this.state
    return (
      <div className="bg-container">
        <div className="body-container">
          <div className="welcome-card">
            <h1 className="name">Hi, Richard</h1>
            <p className="welcome">
              Welcome back to your{' '}
              <span className="money-manager">Money Manager</span>
            </p>
          </div>
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
          <div className="transaction-container">
            <div className="add-transaction">
              <h1 className="transaction-title">Add Transaction</h1>
              <label className="label-text" htmlFor="title">
                TITLE
              </label>
              <input
                value={title}
                onChange={this.onTitleChange}
                className="transaction-input"
                type="text"
                id="title"
                placeholder="TITLE"
              />
              <label className="label-text" htmlFor="amount">
                AMOUNT
              </label>
              <input
                value={amount}
                onChange={this.onAmountChange}
                className="transaction-input"
                type="text"
                id="amount"
                placeholder="AMOUNT"
              />
              <label className="label-text" htmlFor="type">
                TYPE
              </label>
              <select
                value={type}
                onChange={this.onTypeChange}
                className="transaction-input"
                id="type"
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button
                onClick={this.addTransaction}
                className="transaction-btn"
                type="button"
              >
                Add
              </button>
            </div>
            <div className="history-container">
              <h1 className="history-title">History</h1>
              <div className="history-columns">
                <p className="column-title">Title</p>
                <p className="column-title">Amount</p>
                <p className="column-title">Type</p>
              </div>
              <ul className="transaction-history-list">
                {this.showTransactionItems(transactionList)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
