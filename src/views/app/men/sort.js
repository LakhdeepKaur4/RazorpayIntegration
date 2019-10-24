import React, { Fragment,useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, CustomInput } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

const Sort = ({
  selectedOption,
  setselectedOption,
  loadProductsByCategoryFilter
}) => {

   const [modal, setModal] = useState(false);
   const open = () => {
        setModal(true);
      };

    const close = () => {
      setModal(false);
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
                let order="desc" 
                loadProductsByCategoryFilter(sort,order);
                close();    
            }
            else if(value === "newest"){
                let sort="createdAt";
                let order="desc" 
                loadProductsByCategoryFilter(sort,order);
                close();   
            }
    
        setselectedOption(value);
  };


    return (
       <Fragment>
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

        </Fragment>
    );
};

export default Sort;