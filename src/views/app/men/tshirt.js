import React, { useState, useEffect, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { productByCategory, getFilteredProducts } from "../core/apiCore";
import CategoryProduct from "../core/CategoryProduct";
import Sort  from "./sort";
import FilterBy  from "./filterBy";

const Tshirt = props => {
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [selectedOption, setselectedOption] = useState("relevance");
    const [myFilters, setMyFilters] = useState({
            filters: { category: [], pricing: [] }
        });

      
    const loadProductsByCategory = (sort="sold") => {
        productByCategory("men",sort).then(data => {
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
                        <div className="card-title"><span>Men T-Shirts</span></div>
                      
                        {/*<h3>selectedOption: {selectedOption}</h3>*/}
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

                         {/*<div className="separator mb-5"></div>*/}
                          <div className="mt-5">
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

export default Tshirt;