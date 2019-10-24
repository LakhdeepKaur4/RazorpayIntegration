import React, { useState, useEffect,Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
  FormGroup,
  Badge,
  CustomInput 
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../../components/common/CustomBootstrap";

import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/app/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/app/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div>
            {history.map((h, i) => {
                         return (
                   <div key={i}>
                   {h.products.map((p, i) => {
                        return (
                <Colxx xxs="12" key={i}>
                  <Card className="d-flex flex-row mb-3">
                    <NavLink to="/app/ui/cards" className="d-flex">
                      <img alt="Thumbnail" src="/assets/img/chocolate-cake-thumb.jpg" className="list-thumbnail responsive border-0" />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink to="/app/ui/cards" className="w-40 w-sm-100">
                          <p className="list-item-heading mb-1">{p.name}</p>
                        </NavLink>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">Rs. {p.pricing}</p>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{moment(
                                                        p.createdAt
                                                    ).format('llll')}</p>
                        <div className="w-15 w-sm-100">
                          <Badge color="primary" pill ></Badge>
                        </div>
                      </div>
                      <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                          <i className="simple-icon-arrow-right"></i>
                      </div>
                    </div>
                  </Card>
                </Colxx>
                 );
             })}
           </div>
            );
       })}
     </div>
        );
    };

    return (
        <Fragment>
            <h2>My Account</h2>
            <Row>
                <Colxx md="6" sm="6" lg="4" xxs="12">
                  <Card className="mb-4">
                    <CardBody>
                      <div className="text-center">
                        <CardImg top src="/assets/img/profile-pic-l-2.jpg" alt="Card image cap" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail" />
                        <NavLink to="/app/ui/cards">
                          <CardSubtitle className="mb-1">{name}</CardSubtitle>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">{email}</CardText>
                        <Link className="nav-link" to={`/app/profile/${_id}`}>
                        <Button outline size="sm" color="primary">Edit</Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>

                <Colxx xxs="12">
                    <CardTitle className="mb-4">
                      View Orders
                    </CardTitle>
                    <Row className="icon-cards-row mb-2">
                          <Colxx xxs="6" sm="4" md="3" lg="2">
                            <div className={`icon-row-item mb-4`}>
                              <Card >
                                <CardBody className="text-center">
                                  <i className="iconsminds-clock" />
                                  <p className="card-text font-weight-semibold mb-0">
                                    Pending Orders
                                  </p>
                                  <p className="lead text-center">{14}</p>
                                </CardBody>
                              </Card>
                            </div>
                          </Colxx>


                           <Colxx xxs="6" sm="4" md="3" lg="2">
                            <div className={`icon-row-item mb-4`}>
                              <Card >
                                <CardBody className="text-center">
                                  <i className="iconsminds-basket-coins" />
                                  <p className="card-text font-weight-semibold mb-0">
                                    Completed Orders
                                  </p>
                                  <p className="lead text-center">{14}</p>
                                </CardBody>
                              </Card>
                            </div>
                          </Colxx>

                    </Row>
                  </Colxx>



                  <Colxx xxs="12">
                      <Row>
                          {purchaseHistory(history)}
                      </Row>
                    </Colxx>

             </Row>
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                   {/* {userInfo()}*/}
                </div>
            </div>
          </Fragment>
    );
};

export default Dashboard;
