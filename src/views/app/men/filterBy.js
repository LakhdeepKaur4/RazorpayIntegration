import React, { Fragment,useState } from "react";
import { Row, CardBody ,CardHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, TabContent,TabPane, } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import RadioBox from "../core/RadioBox";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { prices } from "../core/fixedPrices";
import { getFilteredProducts } from "../core/apiCore";


const FilterBy = ({
  setProductsByCategory,
  myFilters,
  setMyFilters,
  loadProductsByCategory,
  skip,
  limit,
  setSkip,
  setLimit,
  setselectedOption
}) => {

    const [modalRight, setModalRight] = useState(false);
    const [activeSecondTab, setActiveSecondTab] = useState("1");
    const [error, setError] = useState(false);
    const [size, setSize] = useState(0);
    const [selectOption, setSelectOption] = useState("");
      

     const openFilter = () => {
        setModalRight(true);
      };
    
     const closeFilter = () => {
        setModalRight(false);
     }

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




    return (
       <Fragment>
        <Colxx xxs="6" className="pl-1 pr-1">
            <Button color="light" className="default btn-block" outline onClick={openFilter}>
               Filter By
            </Button>
            </Colxx>
                   <Modal isOpen={modalRight} toggle={openFilter} wrapClassName="modal-right">
                        <ModalHeader toggle={closeFilter}>
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

        </Fragment>
    );
};

export default FilterBy;