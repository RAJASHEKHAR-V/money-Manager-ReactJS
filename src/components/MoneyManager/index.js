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
    // balance: 0,
    // income: 0,
    // expenses: 0, Method-I
  }

  onAddButton = event => {
    event.preventDefault()

    // Here the values taken from the previous state and updating to the new object above
    // Also need to update the balance, income, expenses based incoming typeId

    const {title, amount, typeId} = this.state
    const {displayText} = transactionTypeOptions.filter(
      eachItem => eachItem.optionId === typeId,
    )[0]
    const newObject = {
      id: uuidv4(),
      title,
      amount,
      typeId,
      amountType: displayText,
    }
    // Form-Level Check
    if (title !== '' && amount !== '') {
      this.setState(prevSate => ({
        transactionList: [...prevSate.transactionList, newObject],
        title: '',
        amount: '',
        typeId: transactionTypeOptions[0].optionId,
      }))
    }

    // Method-I Directly updating values after clicking the add button

    // if (typeId === transactionTypeOptions[0].optionId) {
    //   this.setState(prevSate => ({
    //     transactionList: [...prevSate.transactionList, newObject],
    //     title: '',
    //     amount: '',
    //     typeId: transactionTypeOptions[0].optionId,
    //     // balance: prevSate.income + parseInt(amount) - prevSate.expenses,
    //     // income: prevSate.income + parseInt(amount),
    //   }))
    // } else {
    //   this.setState(prevSate => ({
    //     transactionList: [...prevSate.transactionList, newObject],
    //     title: '',
    //     amount: '',
    //     typeId: transactionTypeOptions[0].optionId,
    //     // balance: prevSate.income - parseInt(amount),
    //     // expenses: prevSate.expenses + parseInt(amount),
    //   }))
    // }
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

  onDeleteButton = id => {
    const {transactionList} = this.state
    const filteredTransactionList = transactionList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({
      transactionList: filteredTransactionList,
    })

    // Method-I
    // const {amount, typeId} = transactionList.filter(
    //   eachItem => eachItem.id === id,
    // )[0]
    // if (typeId === transactionTypeOptions[0].optionId) {
    //   this.setState(prevSate => ({
    //     transactionList: filteredTransactionList,
    //     balance: prevSate.income - parseInt(amount) - prevSate.expenses,
    //     income: prevSate.income - parseInt(amount),
    //   }))
    // } else {
    //   this.setState(prevSate => ({
    //     transactionList: filteredTransactionList,
    //     balance: prevSate.balance + parseInt(amount),
    //     expenses: prevSate.expenses - parseInt(amount),
    //   }))
    // }
  }

  // Method-III
  //   getIncome = () => {
  //     const {transactionList} = this.state
  //     let income = 0
  //     transactionList.forEach(eachItem => {
  //       if (eachItem.typeId === transactionTypeOptions[0].optionId) {
  //         income += parseInt(eachItem.amount)
  //       }
  //     })
  //     return income
  //   }

  //   getExpenses = () => {
  //     const {transactionList} = this.state
  //     let expenses = 0
  //     transactionList.forEach(eachItem => {
  //       if (eachItem.typeId === transactionTypeOptions[1].optionId) {
  //         expenses += parseInt(eachItem.amount)
  //       }
  //     })
  //     return expenses
  //   }

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
    const {
      transactionList,
      title,
      amount,
      typeId,
      //   balance,
      //   income,
      //   expenses, Method-I
    } = this.state
    // const income = this.getIncome()      // Method-III
    // const expenses = this.getExpenses()
    const {balance, income, expenses} = this.getUpdateMoneyDetails() // Method-II

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
