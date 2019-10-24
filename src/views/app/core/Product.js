import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { read, listRelated } from "./apiCore";
import ProductDetail from "./ProductDetail";
import RelatedProduct from "./RelatedProducts";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                 // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
       <Fragment>
        {/*{product && product.name}
        {
                product &&
                product.description &&
                product.description.substring(0, 100)
            }*/}
             <Row>
               <Colxx xxs="12" className="pl-0 pr-0 mb-2">
                    {product && product.description && (
                        <ProductDetail product={product} showViewProductButton={false} />
                    )}
                </Colxx>
             </Row>

         <Row>
            <Colxx xxs="12" className="pl-0 pr-0">
                <div className="mb-2 card">
                    <div className="card-body">
                        <div className="card-title"><span>Similar Products</span></div>
                         <div className="separator mb-5"></div>
                          <div>
                            <div className="row social-image-row gallery">
                                {relatedProduct.map((p, i) => (
                                    <div key={i} className="col-6">
                                        <RelatedProduct key={i} product={p} />
                                    </div>
                                ))}
                             </div>

                    </div>

                <div className="separator mb-1 mt-3"></div>
                  <Link to="/app/men" className="createac">
                      <span className="createac float-right" aria-hidden="true"><i className="simple-icon-arrow-right"></i></span>
                      <div className="cac createac">
                        See more
                      </div>
                    </Link>
                 </div>
                 </div>
               </Colxx>
             </Row>
        </Fragment>
    );
};

export default Product;
