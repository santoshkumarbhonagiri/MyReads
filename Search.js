import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

import {Link} from 'react-router-dom';


export default class Search extends Component {
  state={
    query:"",
    searchedBooks:[]
  }
  onChange(query){
    this.setState({
      query: query
    })
    if(query){
      BooksAPI.search(query).then((searchedBooks)=>{
        if(searchedBooks.error){
          this.setState({searchedBooks:[]})
          
        }else{
          this.setState({ searchedBooks: query === "" ? "" : searchedBooks })

        
      }
      })
    }
    else{
      this.setState({searchedBooks:[]})
    }
  }
  render() {
    return (
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
               
                <input type="text" placeholder="Search by title or author"
                  value={this.state.query}
                 onChange={(event)=>this.onChange(event.target.value)}
                 name="query"
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.searchedBooks.map(searchedBook=>{
                      searchedBook.shelf ='none';
                    this.props.books.map(book=>(
                      book.id === searchedBook.id ? searchedBook.shelf = book.shelf : ""
                    ));
                     return(
                      <Book book={searchedBook} key={searchedBook.id} bookShelfHandler={this.props.bookShelfHandler} 
                      />
                     )})
                }
              </ol>
            </div>
        
        </div>
       
    )
  }
}
