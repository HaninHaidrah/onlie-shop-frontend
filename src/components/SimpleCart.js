import { useEffect, useState } from "react";
import "../App.css";

import cookie from "react-cookies";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function SimpleCart() {
  const [addCart, setAddCart] = useState([]);

  useEffect(() => {
    let addedCart = cookie.load("products");
    setAddCart(addedCart);
  }, []);
  return (
    <>
      {addCart !== undefined ? (
        <div className="simple-cart">
          <ul>
            {addCart.map((product) => {
              return (
                <>
                  <li key={product.productName}>
                    {product.productName} <RiDeleteBin3Line />
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="simple-cart">
          <ul>
            <li>There is no items in the cart</li>
          </ul>
        </div>
      )}
    </>
  );
}
