'use strict';

const { GraphQLServer } = require('graphql-yoga');



let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];
let idCount = links.length;
// 2
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews clone woohoo',
    feed: () => links,
    getById: (roots, args) => links.find(item => item.id === args.id)
  },
  Mutation: {
    post: (roots, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (roots, args) => {
      let result = 'Not valid id';
      links.forEach(item => {
        if (args.id === item.id) {
          item.url = args.url;
          item.description = args.description;
          result = item;
        }
      });
      return result; 
    },
    deleteLink: (roots, args) => {
      links = links.filter(item => item.id !== args.id);
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log('Server is running on http://localhost:4000'));