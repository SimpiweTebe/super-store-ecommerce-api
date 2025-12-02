const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { CATEGORIES, products } = require('./products');

//  {
//     id: 1,
//     brand: 'Cool Brand',
//     name: 'Awesome Jacket',
//     price: 699.00,
//     category: CATEGORIES.Jackets,
//     imageUrl: 'https://images.pexels.com/photos/9604298/pexels-photo-9604298.jpeg',
//     availableSize: ['S','M','L', 'XL'],
//     slideImages: [],
//     QTY: 0,
//     description: "Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. "
//   },

// Sample data
// const products = [
//    {
//     id: 1,
//     brand: 'Cool Brand',
//     name: 'Awesome Jacket',
//     price: 699.00,
//     category: CATEGORIES.Jackets,
//     imageUrl: 'https://images.pexels.com/photos/9604298/pexels-photo-9604298.jpeg',
//     availableSize: ['S','M','L', 'XL'],
//     slideImages: [],
//     QTY: 0,
//     description: "Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. "
//   }
// ]; 

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
    searchBooks(query: String!): [Product!]!
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

    const updatedBook = {
      ...products[itemIndex],
      ...input
    }
    products[itemIndex] = updatedBook;
    return updatedBook;
  },

  deleteBook: ({ id }) => {
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