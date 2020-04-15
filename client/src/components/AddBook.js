import { flowRight as compose } from "lodash";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    this.setState({
      name: "",
      genre: "",
      authorId: "",
    });
  }

  render() {
    let data = this.props.getAuthorsQuery;
    let fetchedAuthors;
    if (data.loading) {
      fetchedAuthors = <option disabled>Fetching Authors</option>;
    } else {
      fetchedAuthors = data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book: </label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label>Genre: </label>
          <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label>Author: </label>
          <select name="authorId" value={this.state.authorId} onChange={this.handleChange}>
            <option>Select Author</option>
            {fetchedAuthors}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
