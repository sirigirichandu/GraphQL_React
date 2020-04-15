import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
    this.selectedBook = this.selectedBook.bind(this);
  }

  selectedBook(id) {
    this.setState({
      selected: id,
    });
  }

  render() {
    let data = this.props.data;
    let fetchedBooks;
    if (data.loading) {
      fetchedBooks = <div>Fetching Books..!</div>;
    } else {
      fetchedBooks = data.books.map((book) => (
        <li key={book.id} onClick={() => this.selectedBook(book.id)}>
          {book.name}
        </li>
      ));
    }
    return (
      <div>
        <ul id="book-list">{fetchedBooks}</ul>
        <BookDetails selectedBookDetail={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
