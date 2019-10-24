import React, { useState,Fragment,useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { NotificationManager } from "../../../components/common/react-notifications";

const ProductDetail = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    showBuyNowButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    history,
    match
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const createNotification = (type, className) => {
    let cName = "notificationcss";
     return (
          NotificationManager.primary(
            product.name,
           "Added to Cart",
            3000,
            null,
            null,
            cName
          )
     );
  };

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/app/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        View Product
                    </button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
           createNotification("primary");
           history.push(`/app/product/${product._id}`);
        });
    };

    const buyNow = () => {
        addItem(product, () => {
           setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to={`/app/cart`}/>;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn btn-outline-warning btn-lg btn-block mt-2 mb-2"
                >
                    Add to cart
                </button>
            )
        );
    };

    const showBuyNow = showBuyNowButton => {
        return (
            showBuyNowButton && (
                <button
                    onClick={buyNow}
                    className="btn btn-outline-warning btn-lg btn-block mt-2 mb-2"
                >
                    Buy Now
                </button>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
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
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Adjust Quantity
                            </span>
                        </div>
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
           <div className="card">

            <div className="card-body">
            <p className="capitalize">{product.category && product.category.name}'s</p>

             <div className="card-title"><span>{product.name}</span></div>
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product"/>
                <div className="form-group">
                   <div className="react-rater">
                        <div>
                            <div className="react-rater-star is-disabled is-active"></div>
                        </div>
                        <div>
                            <div className="react-rater-star is-disabled is-active"></div>
                        </div>
                        <div>
                            <div className="react-rater-star is-disabled is-active"></div>
                        </div>
                        <div>
                            <div className="react-rater-star is-disabled is-active"></div>
                        </div>
                        <div>
                            <div className="react-rater-star is-disabled"></div>
                        </div>
                    </div>
                </div>
                {/*<p className="lead mt-2">
                    {product.description.substring(0, 100)}
                </p>*/}
                <br/>
                <p className="black-10">₹ <span className="size-xl">{product.pricing}</span></p>
                <p className="pt-1">MRP: <span aria-hidden="true" className="STPriceSmall no-wrap-price mr-1">₹ 399</span>
                         <span className="italic red">Save ₹ 100.00</span></p>
                {/*<p className="black-9">
                    Category: {product.category && product.category.name}
                </p>
                {/*<p className="black-8">
                    Added on {moment(product.createdAt).fromNow()}
                </p>*/}

                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCart(showAddToCartButton)}

                {showBuyNow(showBuyNowButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
        </Fragment>
    );
};

export default withRouter(ProductDetail);
