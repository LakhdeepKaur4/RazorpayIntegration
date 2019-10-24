import React, { useState, useEffect, Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle,CardHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup, Input, Label, CustomInput, Nav, NavItem,TabContent,TabPane, } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { productByCategory, productByCategoryFilter, getFilteredProducts } from "../core/apiCore";
import CategoryProduct from "../core/CategoryProduct";
import RadioBox from "../core/RadioBox";
import { priceslh } from "../core/fixedPrices";
import { prices } from "../core/fixedPrices";

const Tshirt = props => {
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [error, setError] = useState(false);
    const [selectedOption, setselectedOption] = useState("relevance");

    const [modal, setModal] = useState(false);
    const [modalRight, setModalRight] = useState(false);

    const [activeSecondTab, setActiveSecondTab] = useState("1");

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], pricing: [] }
    });
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectOption, setSelectOption] = useState("");

     const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByCategory(data.data);
                setselectedOption("relevance");
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "pricing") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const clearArray = () =>{
        setSelectOption("");
        loadProductsByCategory();
        closeFilter();
    }

    const toggleSecondTab = (tab) => {
        let activeTab={activeSecondTab};
        if (activeTab !== tab) {
          setActiveSecondTab(tab);
        }
      }

    const open = () => {
        setModal(true);
      };
    const close = () => {
        setModal(false);
     }

     const openFilter = () => {
        setModalRight(true);
      };
    const closeFilter = () => {
        setModalRight(false);
     }

    const radioChange = (e) => {
         const value = e.currentTarget.value;
            if( value === "lowtohigh"){
                 let sort="pricing";
                 let order="asc" 
                 loadProductsByCategoryFilter(sort,order);
                 close();         
            }
            else if(value === "hightolow"){
                let sort="pricing";
                let order="desc" 
                loadProductsByCategoryFilter(sort,order); 
                close();   
            }
            else if(value === "relevance"){
                let sort="sold";
                let order="desc" 
                loadProductsByCategoryFilter(sort,order);
                close();    
            } 
            else if(value === "popularity"){
                let sort="sold";
                let order="asc" 
                loadProductsByCategoryFilter(sort,order);
                close();    
            }
            else if(value === "newest"){
                let sort="createdAt";
                let order="asc" 
                loadProductsByCategoryFilter(sort,order);
                close();   
            }
    
        setselectedOption(value);
  };

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
                        <Colxx xxs="6" className="pl-1 pr-1">
                        <Button color="light" className="default btn-block" outline onClick={open}>
                            Sort
                        </Button>
                        </Colxx>
                        <Modal isOpen={modal} toggle={close} className="sortby">
                            <ModalHeader toggle={close}>
                              Sort By
                            </ModalHeader>
                            <ModalBody>
                            <span>
                               Relevance <CustomInput type="radio"
                                       value="relevance"
                                       checked={selectedOption === "relevance"}
                                       onChange={radioChange}
                                       name="sortby"
                                       default={true}
                                       className="float-right"
                                       id="relevance"
                                       />
                                </span>
                                <br/>
                                Popularity <CustomInput type="radio"
                                       value="popularity"
                                       checked={selectedOption === "popularity"}
                                       onChange={radioChange}
                                       name="sortby"
                                       className="float-right"
                                       id="popularity" />
                                <br/>
                                Price -- Low to high <CustomInput type="radio"
                                       value="lowtohigh"
                                       checked={selectedOption === "lowtohigh"}
                                       onChange={radioChange}
                                       name="sortby"
                                       className="float-right"
                                       id="lowtohigh" />
                                <br/>
                                Price -- High to Low <CustomInput type="radio"
                                       value="hightolow"
                                       checked={selectedOption === "hightolow"}
                                       onChange={radioChange}
                                       name="sortby"
                                       className="float-right"
                                       id="hightolow"/>
                                <br/>
                                Newest First <CustomInput type="radio"
                                       value="newest"
                                       checked={selectedOption === "newest"}
                                       onChange={radioChange}
                                       name="sortby"
                                       className="float-right"
                                       id="newest"/>
                            </ModalBody>
                          </Modal>


           <Colxx xxs="6" className="pl-1 pr-1">
            <Button color="light" className="default btn-block" outline onClick={openFilter}>
               Filter By
            </Button>
            </Colxx>
                   <Modal isOpen={modalRight} toggle={openFilter} wrapClassName="modal-right">
                        <ModalHeader toggle={clearArray}>
                          Filter By
                        </ModalHeader>
                        <ModalBody className="pl-0 pr-0 pt-0 pb-0 filterby">

                            <Colxx xxs="12" xs="12" lg="3" className="pl-0 pr-0">
                              <div className="mb-0 row ml-0 mr-0 h-100">
                                <CardHeader className="pl-0 pr-0 pb-0 col-3">
                                  <Nav tabs className="ml-0 mr-0">
                                    <div className="text-center">
                                      <NavLink
                                        className={classnames({
                                          active: activeSecondTab === "1",
                                          "nav-link": true
                                        })}
                                        onClick={() => {
                                          toggleSecondTab("1");
                                        }}
                                        to="#"
                                      >
                                        Price
                                      </NavLink>
                                    </div>
                                    <div className="text-center">
                                      <NavLink
                                        className={classnames({
                                          active: activeSecondTab === "2",
                                          "nav-link": true
                                        })}
                                        onClick={() => {
                                          toggleSecondTab("2");
                                        }}
                                        to="#"
                                      >
                                        Color
                                      </NavLink>
                                    </div>
                                  </Nav>
                                </CardHeader>

                                <TabContent activeTab={activeSecondTab} className="col-8">
                                  <TabPane tabId="1">
                                    <Row>
                                      <Colxx sm="12">
                                        <CardBody>
                                           <div>
                                            <RadioBox
                                                prices={prices}
                                                handleFilters={filters =>
                                                    handleFilters(filters, "pricing")

                                                }
                                                selectOption={selectOption}
                                                setSelectOption={setSelectOption}
                                            />
                                            </div>
                                        </CardBody>
                                      </Colxx>
                                    </Row>
                                  </TabPane>
                                  <TabPane tabId="2">
                                    <Row>
                                      <Colxx sm="12">
                                        <CardBody>
                                          <div>
                                              
                                          </div>
                                        </CardBody>
                                      </Colxx>
                                    </Row>
                                  </TabPane>
              
                                </TabContent>
                              </div>
                            </Colxx>


                        </ModalBody>
                        <ModalFooter>
                        <Button color="secondary" onClick={clearArray}>
                           Clear
                          </Button>
                          <Button color="secondary" onClick={closeFilter}>
                           Apply
                          </Button>
                        </ModalFooter>
                      </Modal>
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