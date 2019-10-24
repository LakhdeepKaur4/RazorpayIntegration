import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import {   Alert, Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";


const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <p>Loading...</p>
            </div>
        );


    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/" />;
            } else {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
       <Fragment>

       <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <h1>Welcome</h1>
          <Card className="auth-card">
            <div className="form-side">
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />. <span>Already a customer ?</span>
              </CardTitle>
              <br/>
              <Form>
                {showLoading()}
                {showError()}
                <Label className="form-group has-float-label mb-4">
                  <Input 
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email} />
                 <IntlMessages id="user.email" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input 
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password} />
                  <IntlMessages
                    id="user.password"
                    defaultValue={password}
                  />
                </Label>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to={`/app/forgot-password`}>
                    <IntlMessages id="user.forgot-password-question" />
                  </NavLink>
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={clickSubmit}
                   
                  >
                    <IntlMessages id="user.login-button" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>

          <Link to="/app/signup" className="text-center"><h4 className="mt-4"><u>New ? Create Account</u></h4></Link>
        </Colxx>
      </Row>
     {redirectUser()}
        </Fragment>
    );
};

export default Signin;
