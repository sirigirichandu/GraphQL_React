const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

//allow cors
app.use(cors());

//connect to mLab DB
//Replace creds with your own creds
mongoose.connect(
  "mongodb+srv://chandusirigiri:smwwTXV4bZDAPwLb@graphql-pratice-ucgm0.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("connection successful to data..!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(1836, () => {
  console.log("App listening on port 1836");
});
