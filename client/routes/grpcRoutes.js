// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// gRPC client
const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;
const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());
/*
Using an older version of gRPC?
(1) You won't need the @grpc/proto-loader package
(2) const productPackageDefinition = grpc.load(productProtoPath).product;
(3) const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());
*/

// handlers
const listProducts = (req, res) => {
  /*
  gRPC method for reference:
  listProducts(Empty) returns (ProductList)
  */
  client.listProducts({}, (err, result) => {
    res.json(result);
  });
};
const readProduct = (req, res) => {
  const payload = { id: parseInt(req.params.id) };
  /*
  gRPC method for reference:
  readProduct(ProductId) returns (Product)
  */
  client.readProduct(payload, (err, result) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
};
const createProduct = (req, res) => {
  const payload = { name: req.body.name, price: req.body.price };
  /*
  gRPC method for reference:
  createProduct(newProduct) returns (result)
  */
  client.createProduct(payload, (err, result) => {
    res.json(result);
  });
};
const updateProduct = (req, res) => {
  const payload = { id: parseInt(req.params.id), name: req.body.name, price: req.body.price };
  /*
  gRPC method for reference:
  updateProduct(Product) returns (result)
  */
  client.updateProduct(payload, (err, result) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
};
const deleteProduct = (req, res) => {
  const payload = { id: parseInt(req.params.id) };
  /*
  gRPC method for reference:
  deleteProduct(ProductId) returns (result)
  */
  client.deleteProduct(payload, (err, result) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  listProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
