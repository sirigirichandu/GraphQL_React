import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BooKDetails extends Component {
  render() {
    const { book } = this.props.data;
    return (
      <div id="book-details">
        {book ? (
          <div>
            <h2>Book Name: {book.name}</h2>
            <p>Genre: {book.genre}</p>
            <p>Author: {book.author.name}</p>
            <p>All Books By Author : </p>
            <ul className="other-books">
              {book.author.books.map((eachBook) => (
                <li key={eachBook.id}>{eachBook.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          "Please select book to see details"
        )}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.selectedBookDetail,
      },
    };
  },
})(BooKDetails);
