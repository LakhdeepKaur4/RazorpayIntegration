import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { getCart } from "./cartHelpers";
import CartDetail from "./CartDetail";
import Checkout from "./Checkout";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const id = setInterval(() => {
          setItems(()=>getCart());
        }, 1000);
        return () => clearInterval(id);
      }, [items]);


    // useEffect(() => {
    //     setItems(getCart());
    // }, [items]); 

    const showItems = items => {
        return (
             <div className="mb-2 card">
                <div className="card-body">
                <div className="card-title"><span>Your cart has {`${items.length}`} items</span></div>
                <div className="separator mb-5"></div>
              
                  <div>
                    <div className="scrollbar-container ps ps--active-y">
                      

                        {items.map((product, i) => (
                          <div key={i} className="d-flex flex-row mb-3 pb-3 border-bottom">
                            <CartDetail
                                key={i}
                                product={product}
                                showAddToCartButton={false}
                                cartUpdate={true}
                                showRemoveProductButton={true}
                            />
                            </div>
                        ))}

                        </div>
                     </div>
                </div>

            </div>
        );
    };

    const noItemsMessage = () => (
        <Row>
            <Colxx xxs="12" className="pl-2 pr-2">
            <div className="mb-2 card">
                <div className="card-body">
                    <div className="card-title"><span>Your cart is empty.</span></div>
                    <div className="separator mb-5"></div>
                    <Link to="/"><button className="mb-2 btn btn-primary btn-lg btn-block"><span>Continue shopping</span></button></Link>
                    </div>
                 </div>

        <div className="mb-2 card">
        <div className="card-body">
            <div className="card-title"><span>Explore Trending Products</span></div>
            <div className="separator mb-5"></div>
  
              <div className="dashboard-list-with-user">
                <div className="scrollbar-container ps ps--active-y">
                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                        <a href="/app/pages/details"><img src="/assets/img/men.jpg" alt="Very informative content, thank you. " className="img-thumbnail border-0 list-thumbnail align-self-center"/></a>
                        <div className="pl-3 pr-2">
                            <a href="/app/pages/details">
                                <p className="font-weight-medium mb-0">Yellow Half Sleeve T-Shirt</p>
                                <p className="text-muted mb-0 text-small">₹ 299</p>
                                <div className="form-group mb-1 mt-2">
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
                                            <div className="react-rater-star is-disabled is-active"></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>


                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                        <a href="/app/pages/details"><img src="/assets/img/women.jpg" alt="Very informative content, thank you. " className="img-thumbnail border-0 list-thumbnail align-self-center"/></a>
                        <div className="pl-3 pr-2">
                            <a href="/app/pages/details">
                                <p className="font-weight-medium mb-0">Jet Black Half Sleeve T-Shirt</p>
                                <p className="text-muted mb-0 text-small">₹ 299</p>
                                <div className="form-group mb-1 mt-2">
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
                                            <div className="react-rater-star is-disabled is-active"></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                        <a href="/app/pages/details"><img src="/assets/img/cover.jpg" alt="Very informative content, thank you. " className="img-thumbnail border-0 list-thumbnail align-self-center"/></a>
                        <div className="pl-3 pr-2">
                            <a href="/app/pages/details">
                                <p className="font-weight-medium mb-0">Jet Black Phone Cover</p>
                                <p className="text-muted mb-0 text-small">₹ 299</p>
                                <div className="form-group mb-1 mt-2">
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
                                            <div className="react-rater-star is-disabled is-active"></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    </div>
                    </div>

                      <div className="separator mb-2 mt-3"></div>
                      <Link to="/app/trending-products" className="createac">
                          <span className="createac float-right" aria-hidden="true"><i className="simple-icon-arrow-right"></i></span>
                          <div className="cac createac">
                            See more
                          </div>
                        </Link>
                </div>
            </div>
    </Colxx>
</Row>
    );



    return (
        <Fragment>

        <Row>
            <Colxx xxs="12" className="pl-0 pr-0">
             {items.length > 0 ? showItems(items) : noItemsMessage()}
            </Colxx>
        </Row>

        {items.length > 0 ?
           <Row>
            <Colxx xxs="12" className="pl-0 pr-0">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                   <Checkout products={items} />
               </Colxx>
        </Row>:""
        }
        </Fragment>
    );
};

export default withRouter(Cart);
