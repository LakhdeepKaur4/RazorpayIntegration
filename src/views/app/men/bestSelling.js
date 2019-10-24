import React, { useState, useEffect, Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { productByCategory, getFilteredProducts } from "../core/apiCore";
import CategoryProduct from "../core/CategoryProduct";
import Sort  from "./sort";
import FilterBy  from "./filterBy";


const BestSelling = props => {
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [selectedOption, setselectedOption] = useState("relevance");
    const [myFilters, setMyFilters] = useState({
            filters: { category: [], pricing: [] }
        });

    const loadProductsByCategory = () => {
        productByCategory("men","sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {    
                setProductsByCategory(data);
                setMyFilters({
                    filters: { category: [data[0].category], pricing: [] }
                });              
            }
        });
    };

    const loadProductsByCategoryFilter = (sort="sold",order="desc") => {
        getFilteredProducts(skip, limit, myFilters.filters, order, sort).then(data => {
            if (data.error) {
                setError(data.error);
            } else {    
                setProductsByCategory(data.data);              
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
                        <div className="card-title"><span>Best Selling T-Shirts</span></div>
                         <Row className="buttonColor">
                            <Sort
                                selectedOption={selectedOption}
                                setselectedOption={setselectedOption}
                                loadProductsByCategoryFilter={loadProductsByCategoryFilter}
                                />

                             <FilterBy
                               setProductsByCategory={setProductsByCategory}
                                myFilters={myFilters}
                                setMyFilters={setMyFilters}
                                loadProductsByCategory={loadProductsByCategory}
                                skip={skip}
                                limit={limit}
                                setSkip={setSkip}
                                setLimit={setLimit}
                                setselectedOption={setselectedOption}
                                />
              
                            </Row> 
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

export default BestSelling;