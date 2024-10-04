import Product from "./components/Product"; // Import the Product component
import Cart from "./components/Cart"; // Import the Cart component
import Modal from "./components/Modal"; // Import the Modal component
import data from "../data.json"; // Import product data from a JSON file
import "./App.css"; // Import CSS styles for the App
import { useState } from "react"; // Import useState from React for managing component state

export default function App() {
  // State to hold cart items (an array of products added to the cart)
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding products to the cart
  function handleAddToCart(productName, productPrice) {
    // Update the cartItems array to add the product or increment quantity if it already exists
    setCartItems((prevCartItems) => {
      // Check if the product already exists in the cart
      const existingProduct = prevCartItems.find(
        (item) => item.name === productName
      );

      if (existingProduct) {
        // If product exists, increment its quantity
        return prevCartItems.map(
          (item) =>
            item.name === productName
              ? { ...item, quantity: item.quantity + 1 } // Update the product quantity
              : item // Return other products unchanged
        );
      } else {
        // If product is not in the cart, add it with a quantity of 1
        return [
          ...prevCartItems,
          { name: productName, quantity: 1, price: productPrice },
        ];
      }
    });
  }

  // State to hold product data, including a cartCount initialized to 0 for each product
  const [products, setProducts] = useState(
    data.map((product) => ({
      ...product, // Spread operator to copy original product properties
      cartCount: 0, // Add a new property 'cartCount' for tracking quantity in the cart
    }))
  );

  // Function to handle incrementing the cart count for a product
  function handleIncrement(productName, productPrice) {
    // Update the cart count in the products state
    setProducts((prevProducts) =>
      prevProducts.map(
        (product) =>
          product.name === productName
            ? { ...product, cartCount: product.cartCount + 1 } // Increment the cart count
            : product // Return other products unchanged
      )
    );

    // Add the product to the cart by calling the handleAddToCart function
    handleAddToCart(productName, productPrice);
  }

  // Function to handle decrementing the cart count for a product
  function handleDecrement(productName) {
    // Update the cart count in the products state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === productName
          ? { ...product, cartCount: product.cartCount - 1 } // Decrement the cart count
          : product
      )
    );

    // Update the cart by decrementing or removing the product from the cart
    setCartItems(
      (prevCartItems) =>
        prevCartItems
          .map((item) => {
            if (item.name === productName) {
              if (item.quantity > 1) {
                // If the product quantity is greater than 1, decrement the quantity
                return { ...item, quantity: item.quantity - 1 };
              } else if (item.quantity === 1) {
                // If the product quantity is 1, remove the product by returning null
                return null;
              }
            }
            // For other products, return them unchanged
            return item;
          })
          .filter(Boolean) // Filter out null values (removed products)
    );
  }

  // Function to handle completely removing a product from the cart
  function handleRemove(productName) {
    // Remove the product from the cartItems state
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.name !== productName)
    );

    // Reset the cartCount for the product in the products state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === productName ? { ...product, cartCount: 0 } : product
      )
    );
  }

  // Calculate the total number of items in the cart
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Render the list of products using the Product component
  const productList = products.map((product) => (
    <Product
      cartCounter={product.cartCount} // Pass the current cart count to the Product component
      handleDecrement={() => handleDecrement(product.name)} // Pass the decrement function
      handleIncrement={() => handleIncrement(product.name, product.price)} // Pass the increment function
      key={product.name} // Unique key for each product (required by React)
      image={product.image.desktop} // Pass the product's desktop image
      category={product.category} // Pass the product category
      name={product.name} // Pass the product name
      price={product.price} // Pass the product price
    />
  ));

  // State to control whether the modal is open or not
  const [isModelOpen, setIsModelOpen] = useState(false);

  // Function to open the modal for order confirmation
  function handleConfirm() {
    setIsModelOpen(true); // Set modal state to true (open)
  }

  // Function to handle starting a new order (reset everything)
  function handleNewOrder() {
    setIsModelOpen(false); // Close the modal
    setCartItems([]); // Clear the cartItems state (empty cart)
    setProducts(
      data.map((product) => ({
        ...product, // Reset each product's cartCount to 0
        cartCount: 0,
      }))
    );
  }

  // Render the overall app structure
  return (
    <div className="container">
      <div className="productList">
        <h1 className="title">Desserts</h1> {/* Title for the product list */}
        <section className="products">{productList}</section>
        {/* Display product list */}
      </div>
      <section className="cart">
        <Cart
          cartCounter={totalCartItems} // Pass total number of items in the cart
          cartItems={cartItems} // Pass the current cart items
          isModelOpen={isModelOpen} // Pass whether the modal is open or not
          handleConfirm={handleConfirm} // Pass function to confirm the order
          handleRemove={handleRemove} // Pass function to remove items from the cart
          totalPrice={totalPrice} // Pass the total price of items in the cart
        />
      </section>
      {/* Render the Modal component only if it is open */}
      {isModelOpen && (
        <Modal
          totalPrice={totalPrice} // Pass the total price to the modal
          cartItems={cartItems} // Pass the current cart items to the modal
          isModelOpen={isModelOpen} // Pass the modal state
          handleNewOrder={handleNewOrder} // Pass the function to start a new order
        />
      )}
    </div>
  );
}
