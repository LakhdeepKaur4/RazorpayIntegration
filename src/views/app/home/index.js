import React, { useState, useEffect,Fragment } from "react";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import ReactSiemaCarousel from "../../../components/ReactSiema/ReactSiemaCarousel";
import { getProducts } from "../core/apiCore";
import Pcard from "../core/Card";
import Search from "../core/Search";
import AppLayout from "../../../layout/AppLayout";
import ContentLoader from 'react-content-loader';
import { isAuthenticated } from "../../../views/app/auth";
import { NavLink, Link, withRouter } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";

import data from "../../../data/carouselItems";

const BasicCarouselItem = ({ title, img, detail, badges }) => {
  return (
    <div className="pr-3 pl-3">
      <Card className="flex-row">
        <div className="w-50 position-relative">
          <img className="card-img-left" src={img} alt={title} />
          {badges &&
            badges.map((b, index) => {
              return (
                <span
                  key={index}
                  className={`badge badge-pill badge-${
                    b.color
                  } position-absolute ${
                    index === 0
                      ? "badge-top-left"
                      : "badge-top-left-" + (index + 1)
                  }`}
                >
                  {b.title}
                </span>
              );
            })}
        </div>
        <div className="w-50">
          <CardBody>
            <h6 className="mb-4">{title}</h6>
            <footer>
              <p className="text-muted text-small mb-0 font-weight-light">
                {detail}
              </p>
            </footer>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

const NoControlCarouselItem = ({ title, img, detail, badges }) => {
  return (
    <div className="pr-3 pl-3">
      <Card>
        <div className="position-relative">
          <img className="card-img-top" src={img} alt={title} />
          {badges &&
            badges.map((b, index) => {
              return (
                <span
                  key={index}
                  className={`badge badge-pill badge-${
                    b.color
                  } position-absolute ${
                    index === 0
                      ? "badge-top-left"
                      : "badge-top-left-" + (index + 1)
                  }`}
                >
                  {b.title}
                </span>
              );
            })}
        </div>
      </Card>
    </div>
  );
};


const MyLoader = () => (
  <ContentLoader 
    height={275}
    width={250}
    speed={7}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    
    <rect x="1" y="244" rx="4" ry="4" width="72" height="9" /> 
    <rect x="1" y="1" rx="5" ry="5" width="228" height="228" />
  </ContentLoader>
)


const App = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(true);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {    
                setProductsBySell(data);  
                setLoader(false);             
            }
        }
        );
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
                setLoader(false);  
            }
        });
    };


    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <AppLayout>
        <Fragment>

        <Row>
          <Colxx xxs="12" className="pl-0 pr-0">
            <ReactSiemaCarousel
              perPage={{
                0: 1,
                480: 3,
                800: 3,
                1200: 1
              }}
              controls={false}
              loop={true}
            >
              {data.map(item => {
                return (
                  <div key={item.id}>
                    <NoControlCarouselItem {...item} />
                  </div>
                );
              })}
            </ReactSiemaCarousel>
          </Colxx>
        </Row>

 {!isAuthenticated() && (
      <Row>
       <Colxx xxs="12" className="pl-0 pr-0">
        <div className="mb-2 card">
        <div className="card-body">
            <div className="card-title"><span>Sign in for the best experience</span></div>
            <div>
                 <Link to="/app/signin"><button className="mb-2 btn btn-primary btn-lg btn-block"><span>Sign in</span></button></Link>
                <Link to="/app/signup" className="createac">
                  <span className="createac float-right" aria-hidden="true"><i className="simple-icon-arrow-right"></i></span>
                  <div className="cac createac">
                    Create an account
                  </div>
                </Link>
            </div>

            </div>
        </div>
        </Colxx>
    </Row>
    )}


     <Row>
        <div className="mb-2 card">
        <div className="card-body">
            <div className="card-title"><span>Men's fashion</span></div>
            <div className="separator mb-5"></div>
            <div>
                <div className="row social-image-row gallery">
                    <div className="col-6">
                        <Link to="/app/product/5d74a834ed07ef1318936b6c"><img className="img-fluid border-radius" src="/assets/img/men.jpg" alt="thumbnail"/>
                        <span className="badge badge-pill badge-theme-1 position-absolute badge-top-left-image">NEW</span>
                         <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                        </Link>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/men.jpg" alt="thumbnail"/></a>
                        <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 365</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/men.jpg" alt="thumbnail"/></a>
                        <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/men.jpg" alt="thumbnail"/></a>
                        <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                    </div>
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
</Row>



<Row>
        <div className="mb-2 card">
        <div className="card-body">
            <div className="card-title"><span>Women's fashion</span></div>
            <div className="separator mb-5"></div>
            <div>
                <div className="row social-image-row gallery">
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/women.jpg" alt="thumbnail"/>
                         <span className="badge badge-pill badge-theme-1 position-absolute badge-top-left-image">NEW</span>
                           <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                        </a>

                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/women.jpg" alt="thumbnail"/>
                           <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                        </a>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/women.jpg" alt="thumbnail"/>
                            <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                        </a>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/women.jpg" alt="thumbnail"/>

                         <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                          </a>
                    </div>
                </div>
            </div>

              <div className="separator mb-1 mt-3"></div>
              <Link to="/app/women"  className="createac">
                  <span className="createac float-right" aria-hidden="true"><i className="simple-icon-arrow-right"></i></span>
                  <div className="cac createac">
                    See more
                  </div>
                </Link>


        </div>
    </div>
</Row>



<Row>
        <div className="mb-2 card">
        <div className="card-body">
            <div className="card-title"><span>Phone Cases & Covers</span></div>
            <div className="separator mb-5"></div>
            <div>
                <div className="row social-image-row gallery">
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/cover.jpg" alt="thumbnail"/>
                          <span className="badge badge-pill badge-theme-1 position-absolute badge-top-left-image">NEW</span>
                           <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                          </a>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/cover.jpg" alt="thumbnail"/>
                         <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                          </a>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/cover.jpg" alt="thumbnail"/>
                         <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                         </a>
                    </div>
                    <div className="col-6">
                        <a href="/app/pages/product/details"><img className="img-fluid border-radius" src="/assets/img/cover.jpg" alt="thumbnail"/>
                         <div className="productPrice">
                            <span className="salePrice no-wrap-price">₹ 366</span>
                             <span aria-hidden="true" className="STPriceSmall no-wrap-price">₹ 399</span>
                          </div>
                         </a>
                    </div>
                </div>
            </div>

              <div className="separator mb-1 mt-3"></div>
              <Link to="/app/phone-covers" className="createac">
                  <span className="createac float-right" aria-hidden="true"><i className="simple-icon-arrow-right"></i></span>
                  <div className="cac createac">
                    See more
                  </div>
                </Link>

        </div>
    </div>
</Row>


<Row>
<Colxx xxs="12" className="pl-0 pr-0">
        <div className="mb-2 card">
        <div className="card-body">
            <div className="card-title"><span>Trending Products</span></div>
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


 <Row>
       <Colxx xxs="12" className="pl-0 pr-0">
        <div className="mb-2 card">
        <div className="card-body">
            <div className="card-title"><span>Today's Deals</span></div>
            <div className="separator mb-5"></div>

             <Row>
                <Colxx xxs="12" className="pl-0 pr-0">
                  <ReactSiemaCarousel
                    perPage={{
                      0: 1,
                      1000: 2,
                      1400: 3
                    }}
                    loop={false}
                  >
                    {data.map(item => {
                      return (
                        <div key={item.id}>
                          <BasicCarouselItem {...item} />
                        </div>
                      );
                    })}
                  </ReactSiemaCarousel>
                </Colxx>
              </Row>

             <div className="separator mb-1 mt-3"></div>
              <Link to="/app/today-deals" className="createac">
                  <span className="createac float-right" aria-hidden="true"><i className="simple-icon-arrow-right"></i></span>
                  <div className="cac createac">
                    See more
                  </div>
                </Link>


            </div>
        </div>
        </Colxx>
    </Row>

            {/*<Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => ( 
                      <div key={i} className="col-4 mb-3">
                      {loader ? <MyLoader/>:
                             <Pcard product={product} />
                     }
                    </div>
                     
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                    {loader ? <MyLoader/> :
                        <Pcard product={product}/>
                    }
                    </div>
                ))}
            </div>*/}
        </Fragment>
        </AppLayout>
    );
};

export default App;
