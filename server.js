const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { CATEGORIES, products } = require('./products');

// Define the schema using GraphQL schema language
const schema = buildSchema(`
  # A book has a title, author, and publication year
  type Product {
    id: ID!
    brand: String!
    name: String!
    price: Int!
    category: String!
    availableSize: [String!]!
    slideImages: [String]
    QTY: Int
    description:String
  }

  # The "Query" type is the root of all GraphQL queries
  type Query {
    # Get all products
    products: [Product!]!
    # Get a specific product by ID
    product(id: ID!): Product
    # Search products by name or brand
    searchProducts(query: String!): [Product!]!
  }

  # Input type for adding/updating products
  input ProductInput {
    brand: String!
    name: String!
    price: Int!
    category: String!
    availableSize: [String!]!
    slideImages: [String]
    QTY: Int
    description:String
  }

  type Mutation {
    # Add a new product
    addProduct(input: ProductInput!): Product!
    # Update an existing product
    updateProduct(id: ID!, input: ProductInput!): Product
    # Delete a product
    deleteProduct(id: ID!): Boolean
  }
`); 

// Define resolvers for the schema fields
const root = {
  // Resolver for fetching all products
  products: () => products,
  
  // Resolver for fetching a single book by ID
  product: ({ id }) => products.find(product => product.id === id),
  
  // Resolver for searching books
  searchProducts: ({ query }) => {
    const searchTerm = query.toLowerCase();
    return products.filter(
      product =>
        product.brand.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm)
    );
  },
  // Mutation resolvers
  addProduct: ({ input }) => {
    const newProduct = {
      id: String(products.length + 1),
      ...input
    }
    products.push(newProduct);
    return newProduct;
  },

  updateProduct: ({ id, input }) => {
    const itemIndex = products.findIndex(book => book.id === id);
    if (itemIndex === -1) return null;

    const updatedProduct = {
      ...products[itemIndex],
      ...input
    }
    products[itemIndex] = updatedProduct;
    return updatedProduct;
  },

  deleteProduct: ({ id }) => {
    const itemIndex = products.findIndex(book => book.id === id);
    if (itemIndex === -1) return false;

    products.splice(itemIndex, 1);
    return true;
  }
}; 

// Create an Express app
const app = express();

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  // Enable the GraphiQL interface for testing
  graphiql: true,
}));

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
}); 