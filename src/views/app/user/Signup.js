import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import {   Alert, Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";


const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

   const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
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

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to={`/app/signin`}>Signin</Link>
        </div>
    );

    return (
       <Fragment>

         <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
             <h1>Welcome</h1>
              <Card className="auth-card">            
                <div className="form-side">                 
                  <CardTitle className="mb-6">
                    <IntlMessages id="user.register" />.
                  </CardTitle>
                  <br/>
                  <Form>
                {showSuccess()}
                {showError()}
                    <Label className="form-group has-float-label mb-4">
                      <Input 
                        type="name" 
                        onChange={handleChange("name")}
                        className="form-control"
                        value={name} />
                      <IntlMessages id="user.fullname" />
                    </Label>
                    <Label className="form-group has-float-label mb-4">
                      <Input 
                        onChange={handleChange("email")}
                        type="email"
                        className="form-control"
                        value={email}
                         />
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
                      />
                    </Label>
                    <div className="d-flex justify-content-end align-items-center">
                      <Button
                        color="primary"
                        className="btn-shadow"
                        size="lg"
                        onClick={clickSubmit}
                      >
                        <IntlMessages id="user.register-button" />
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card>
               <Link to="/app/signin" className="text-center"><h4 className="mt-4"><u>Login. Already a Customer ?</u></h4></Link>
            </Colxx>
          </Row>
        </Fragment>
    );
};

export default Signup;
