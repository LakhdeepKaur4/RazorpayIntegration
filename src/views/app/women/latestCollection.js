import React, { useState, useEffect, Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { productByCategory } from "../core/apiCore";
import CategoryProduct from "../core/CategoryProduct";

const LatestCollection = props => {
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsByCategory = () => {
        productByCategory("women","createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {    
                setProductsByCategory(data);              
            }
        });
    };

    useEffect(() => {
        loadProductsByCategory();
    }, []);

    return (
       <Fragment>

         <Row>
            <Colxx xxs="12" className="pl-0 pr-0">
                <div className="mb-2 card">
                    <div className="card-body">
                        <div className="card-title"><span>Latest Collection Tops</span></div>
                         <div className="separator mb-5"></div>
                          <div>
                            <div className="row social-image-row gallery">
                                {productsByCategory.map((p, i) => (
                                    <div key={i} className="col-6">
                                        <CategoryProduct key={i} product={p} />
                                    </div>
                                ))}
                             </div>
                          </div>
                     </div>
                 </div>
               </Colxx>
             </Row>
        </Fragment>
    );
};

export default LatestCollection;