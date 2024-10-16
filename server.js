const express = require('express');
const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const resolvers = require('./graphql/resolvers'); 
const typeDefs = require('./graphql/typeDefs'); 
const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);


const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:4000/graphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, 'your_secret_key');
    }
    return null;
  } catch (error) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);
    return { user };
  }
});

server.start().then(() => {
  app.use('/graphql', express.json(), expressMiddleware(server));
  app.listen({ port: 4000 }, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
});