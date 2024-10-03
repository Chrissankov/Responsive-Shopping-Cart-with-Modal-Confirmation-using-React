import Product from "./components/Product"; // Import the Product component
import Cart from "./components/Cart"; // Import the Cart component
import Modal from "./components/Modal"; // Import the Modal component
import data from "../data.json"; // Import product data from a JSON file
import "./App.css"; // Import CSS styles for the App
import { useState } from "react"; // Import useState from React for managing component state

export default function App() {
  // State to hold cart items (array of items)
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  function handleAddToCart(productName, productPrice) {
    // Update cartItems with the new product or update quantity if already exists
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(
        (item) => item.name === productName
      );

      if (existingProduct) {
        // If product exists in the cart, increment its quantity
        return prevCartItems.map(
          (item) =>
            item.name === productName
              ? { ...item, quantity: item.quantity + 1 } // Increment quantity
              : item // Return unchanged items
        );
      } else {
        // If product is new, add it to the cart with quantity 1 and its price
        return [
          ...prevCartItems,
          { name: productName, quantity: 1, price: productPrice },
        ];
      }
    });
  }

  // Initialize product data with a cartCount of 0 for each product
  const [products, setProducts] = useState(
    data.map((product) => ({
      ...product, // Copy all properties from the original product
      cartCount: 0, // Add cartCount property initialized to 0
    }))
  );

  // Function to increase the cart count for a product and update cart
  function handleIncrement(productName, productPrice) {
    // Update product list to increment cartCount
    setProducts((prevProducts) =>
      prevProducts.map(
        (product) =>
          product.name === productName
            ? { ...product, cartCount: product.cartCount + 1 } // Increment cart count
            : product // Keep other products unchanged
      )
    );

    // Add product to cart with updated quantity
    handleAddToCart(productName, productPrice);
  }

  // Function to decrease the cart count and remove from cart if quantity is 0
  function handleDecrement(productName) {
    // Update product list to decrement cartCount
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === productName
          ? { ...product, cartCount: product.cartCount - 1 } // Decrement cart count
          : product
      )
    );

    // Update cartItems to reflect the decreased quantity or removal of item
    setCartItems(
      (prevCartItems) =>
        prevCartItems
          .map(
            (item) =>
              item.name === productName && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 } // Decrement quantity
                : item.name === productName && item.quantity === 1
                ? null // Remove if quantity reaches 1
                : item // Keep other items unchanged
          )
          .filter(Boolean) // Remove null entries
    );
  }

  // Function to remove a product completely from the cart
  function handleRemove(productName) {
    // Remove the product from the cart
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.name !== productName)
    );

    // Reset the cartCount for the removed product
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === productName ? { ...product, cartCount: 0 } : product
      )
    );
  }

  // Calculate total number of items in the cart
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Render the list of products using Product component
  const productList = products.map((product) => (
    <Product
      cartCounter={product.cartCount} // Pass the current cart count for the product
      handleDecrement={() => handleDecrement(product.name)} // Pass decrement function
      handleIncrement={() => handleIncrement(product.name, product.price)} // Pass increment function
      key={product.name} // Unique key using product name
      image={product.image.desktop} // Pass the desktop image of the product
      category={product.category} // Pass the category of the product
      name={product.name} // Pass the name of the product
      price={product.price} // Pass the price of the product
    />
  ));

  // State to control the modal visibility
  const [isModelOpen, setIsModelOpen] = useState(false);

  // Function to open the modal for order confirmation
  function handleConfirm() {
    setIsModelOpen(true); // Open the modal
  }

  // Function to reset the order and close the modal
  function handleNewOrder() {
    setIsModelOpen(false); // Close the modal
    setCartItems([]); // Clear the cart
    setProducts(
      data.map((product) => ({
        ...product, // Reset products and set cartCount to 0
        cartCount: 0,
      }))
    );
  }

  // Render the overall structure of the page
  return (
    <div className="container">
      <div className="productList">
        <h1 className="title">Desserts</h1>
        <section className="products">{productList}</section>{" "}
        {/* Render the product list */}
      </div>
      <section className="cart">
        <Cart
          cartCounter={totalCartItems} // Pass total items in cart
          cartItems={cartItems} // Pass all cart items
          isModelOpen={isModelOpen} // Pass modal state
          handleConfirm={handleConfirm} // Pass function to confirm order
          handleRemove={handleRemove} // Pass function to remove items from cart
          totalPrice={totalPrice} // Pass total price
        />
      </section>
      {/* Render Modal if open */}
      {isModelOpen && (
        <Modal
          totalPrice={totalPrice} // Pass total price
          cartItems={cartItems} // Pass all cart items
          isModelOpen={isModelOpen} // Pass modal state
          handleNewOrder={handleNewOrder} // Pass function to reset order
        />
      )}
    </div>
  );
}
