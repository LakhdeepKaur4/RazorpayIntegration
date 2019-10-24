import React, { useState,Fragment,useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { API } from "../config";
import { Colxx } from "../../../components/common/CustomBootstrap";

const CartDetail = ({
    product,
    showViewProductButton = false,
    showAddToCartButton = false,
    showBuyNowButton = false,
    cartUpdate = false,
    showRemoveProductButton = false,
    history,
    match
}) => {
    const [count, setCount] = useState(product.count);

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {removeItem(product._id);
                      history.push(`/app/cart`);
                    }}
                    className="default btn btn-block mt-2 mb-2"
                >
                    Delete
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock</span>
        );
    };

 

    const handleChange = productId => event => {
       // setCount(event.target.value < 1 ? 1 : event.target.value);
       setCount(event.target.value < 0 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }

        return {
            count,
            setCount,
            reset: () => setCount(""),
            bind: {
              count,
              onChange: event => {
                setCount(event.target.value);
              }
            }
          };
        
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-2 mt-2">
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };

    return (

        <Fragment>
        <Colxx xxs="3" className="pl-0 pr-0">
         <Link to={`/app/product/${product._id}`}>
         <img src={`${API}/product/photo/${product._id}`} className="img-thumbnail border-0 list-thumbnail align-self-center"/>
         </Link>
         </Colxx>
         <Colxx xxs="9" className="pl-0 pr-0">
            <div className="pl-3 pr-2">
                    <p className="font-weight-medium mb-0">{product.name}</p>
                    <div className="productPrice">
                        <span className="salePrice no-wrap-price">₹ {product.pricing}</span>
                         <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                      </div>
                        <br/>
                        {showStock(product.quantity)}
                        <br/>
                        <Row>
                            <Colxx xxs="6" className="pl-1 pr-1">
                            {showCartUpdateOptions(cartUpdate)}
                            </Colxx>
                            <Colxx xxs="6" className="pl-1 pr-1">
                            {showRemoveButton(showRemoveProductButton)}
                            </Colxx>
                       </Row>            

                 </div>
                 </Colxx>

        </Fragment>
    );
};

export default withRouter(CartDetail);
