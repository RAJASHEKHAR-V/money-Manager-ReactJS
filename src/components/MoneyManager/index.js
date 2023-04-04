import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

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
    transactionList: [],
    title: '',
    amount: '',
    typeId: transactionTypeOptions[0].optionId,
    date: '',
  }

  onAddButton = event => {
    event.preventDefault()
    const {title, amount, typeId, date} = this.state
    const {displayText} = transactionTypeOptions.filter(
      eachItem => eachItem.optionId === typeId,
    )[0]
    const newObject = {
      id: uuidv4(),
      title,
      amount,
      typeId,
      amountType: displayText,
      date,
    }
    // Here the values taken from the previous state and updating to the new object above
    // Also need to update the balance, income, expenses based incoming typeId
    // Form-Level Check

    if (title !== '' && amount !== '') {
      this.setState(prevSate => ({
        transactionList: [...prevSate.transactionList, newObject],
        title: '',
        amount: '',
        typeId: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onChangeOfTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeOfAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeOfOptions = event => {
    console.log(event.target.value)
    this.setState({typeId: event.target.value})
  }

  onChangeOfDate = event => {
    this.setState({date: event.target.value})
  }

  onDeleteButton = id => {
    const {transactionList} = this.state
    const filteredTransactionList = transactionList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({
      transactionList: filteredTransactionList,
    })
  }

  getUpdateMoneyDetails = () => {
    const {transactionList} = this.state
    let balance = 0
    let income = 0
    let expenses = 0

    transactionList.forEach(eachItem => {
      if (eachItem.typeId === transactionTypeOptions[0].optionId) {
        income += parseInt(eachItem.amount)
      } else {
        expenses += parseInt(eachItem.amount)
      }
    })
    balance = income - expenses
    return {balance, income, expenses}
  }

  render() {
    const {transactionList, title, amount, typeId} = this.state
    const {balance, income, expenses} = this.getUpdateMoneyDetails()

    return (
      <div className="bg-container">
        <div className="money-manager-card">
          <h1 className="user-heading">Hi, Richard</h1>
          <p className="welcome-para">
            Welcome back to your{' '}
            <span className="manager-para">Money Manager</span>
          </p>
        </div>
        <div className="money-Details-card">
          <MoneyDetails
            key="MONEY"
            balance={balance}
            income={income}
            expenses={expenses}
          />
        </div>
        <div className="input-transaction-card">
          <form className="form-el" onSubmit={this.onAddButton}>
            <h1 className="transaction-heading">Add Transaction</h1>
            <label className="title-label" htmlFor="title-id">
              TITLE
            </label>
            <input
              placeholder="TITLE"
              type="text"
              id="title-id"
              className="title-input"
              value={title}
              onChange={this.onChangeOfTitle}
            />
            <label className="amount-label" htmlFor="amount-id">
              AMOUNT
            </label>
            <input
              placeholder="AMOUNT"
              type="text"
              id="amount-id"
              className="amount-input"
              value={amount}
              onChange={this.onChangeOfAmount}
            />
            <label className="date-time" htmlFor="time">
              DATE
            </label>
            <input
              type="date"
              id="time"
              className="date-input"
              onChange={this.onChangeOfDate}
            />
            <select
              className="transaction-options"
              onChange={this.onChangeOfOptions}
              value={typeId}
            >
              {transactionTypeOptions.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <div>
              <button className="add-button" type="submit">
                Add
              </button>
            </div>
          </form>
          <ul className="transaction-history-card">
            <h1 className="history-item-heading">History</h1>
            <li className="transaction-description-item">
              <p className="description-title">Title</p>
              <p className="description-amount">Amount</p>
              <p className="description-type">Type</p>
            </li>
            {transactionList.map(eachItem => (
              <TransactionItem
                key={eachItem.id}
                transactionObject={eachItem}
                onDeleteButton={this.onDeleteButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
