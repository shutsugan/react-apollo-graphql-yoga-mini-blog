import { GraphQLServer } from 'graphql-yoga';
import express from 'express';
import { join } from 'path';

import { url } from './config';
import { startDb, models } from './db';

import Query from './graphql/resolvers/Query';
import Mutation from './graphql/resolvers/Mutation';
import User from './graphql/resolvers/User';
import Post from './graphql/resolvers/Post';
import Vote from './graphql/resolvers/Vote';

const db = startDb({ url });
const typeDefs = `${__dirname}/graphql/schema.graphql`;
const resolvers = { Query, Mutation, User, Post, Vote };
const context = { models, db };

const options = {
  port: 4000,
  cors: { origin: '*' }
};

const Server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...request,
    context
  })
});

Server.express.use('/images', express.static(join(__dirname, 'uploads')));
Server.start(options, _ => console.log(`Server running on ${options.port}`));
