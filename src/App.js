import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import { url } from "./utils/api"
import Main from "./components/ui/Main/Main"
import BookList from "./components/ui/BookList/BookList"


class App extends Component {
  constructor(props){
    super (props)
    this.state = {
      books: [],
      count: 0,
      success: false
    }
 this.booksHandler = this.booksHandler.bind(this)
 this.fillList = this.fillList.bind(this)
  }

booksHandler(book, id){
  this.setState ({
    books: [...this.state.books, { ...book, id }]
  })
}


fillList(key){
  fetch(url + 'op=select&key=' + key)
    .then(response => response.json())
    .then(data => {
      if(data.status !== 'success' && this.state.count <10) {
      this.setState({
        count: this.state.count +1
      })
      this.fillList(key)
    } else {
      this.setState({
        success: true,
        books: data.data
      })
    }
  }
)}



    componentDidMount(){

  const key = localStorage.getItem('apiKey')

  //if (key) {
    // fetch(url + 'op=select' + '&key=' + key)
    //   .then(response => response.json())
    //   .then(data => {
    //     if(data.status === 'success') {
    //     this.setState({
    //       books: data.data
    //     })
    //
    if(key){
    this.fillList(key)
    } else {

    fetch(url + 'requestKey')
      .then(response => response.json())
      .then(data => {
        this.fillList(data.key)
          })
}
}

  render() {
    return (
      <div className="App">
        <Header />
        <Main booksHandler={this.booksHandler}/>
        <BookList books={this.state.books} />
      </div>
    )
  }
}

export default App
