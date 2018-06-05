'use strict';

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding')

// 2
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews clone woohoo',
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    },
    // getById: (roots, args, context, info) => links.find(item => item.id === args.id)
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info);
    },
    // updateLink: (roots, args) => {
    //   let result = 'Not valid id';
    //   links.forEach(item => {
    //     if (args.id === item.id) {
    //       item.url = args.url;
    //       item.description = args.description;
    //       result = item;
    //     }
    //   });
    //   return result; 
    // },
    // deleteLink: (roots, args) => {
    //   links = links.filter(item => item.id !== args.id);
    // }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/public-bravegem-209/hackernews-node/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
});
server.start(() => console.log('Server is running on http://localhost:4000'));