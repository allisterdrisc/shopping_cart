import axios from 'axios';
import { productSchema, newItemSchema, productsSchema, itemsSchema, type NewProduct } from './types';

// get all products
export const getProducts = async () => {
  try {
    const { data } = await axios.get('/api/products');
    console.log('PRODUCTS', productsSchema.parse(data));
    return productsSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// add a new product
export const addProduct = async (newProduct: NewProduct) => {
  try {
    const { data } = await axios.post('/api/products', { ...newProduct });
    return productSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// update existing product
export const updateProduct = async (productId: string, updatedProduct: NewProduct) => {
  try {
    const { data } = await axios.put(`/api/products/${productId}`, {...updatedProduct});
    return productSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// delete a product
export const deleteProduct = async (productId: string) => {
  try {
    await axios.delete(`/api/products/${productId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// get all cart items
export const getCartItems = async () => {
  try {
    const { data } = await axios.get('/api/cart');
    return itemsSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// checkout cart/ remove all items from cart
export const checkoutCart = async () => {
  try {
    await axios.post('/api/checkout');
    return null;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// add item to cart
export const addItemToCart = async (productId: string) => {
  try {
    const { data } = await axios.post('/api/add-to-cart', { productId });
    return newItemSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// get currency rate
export const getCurrencyRates = async () => {
  try {
    const { data } = await axios.get('https://open.er-api.com/v6/latest/USD');
    return {
      EUR: data.rates.EUR,
      USD: 1,
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}