import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import men from "./men";
import women from "./women";
import blankPage from "./blank-page";
import search from "./home/search";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import Profile from "./user/Profile";

import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/men`} />
          <Route path={`${match.url}/men`} component={men} />
          <Route path={`${match.url}/search`} component={search} />
          <Route path={`${match.url}/women`} component={women} />
          <Route path={`${match.url}/blank-page`} component={blankPage} />

          <Route path={`${match.url}/shop`} exact component={Shop} />
          <Route path={`${match.url}/signin`} exact component={Signin} />
          <Route path={`${match.url}/signup`} exact component={Signup} />
          <PrivateRoute
              path={`${match.url}/user/dashboard`}
              exact
              component={Dashboard}
          />
          <AdminRoute
              path={`${match.url}/admin/dashboard`}
              exact
              component={AdminDashboard}
          />
          <PrivateRoute
              path={`${match.url}/profile/:userId`}
              exact
              component={Profile}
          />

           <AdminRoute
                path={`${match.url}/create/category`}
                exact
                component={AddCategory}
            />
            <AdminRoute
                path={`${match.url}/create/product`}
                exact
                component={AddProduct}
            />
            <Route path={`${match.url}/product/:productId`} exact component={Product} />
            <Route path={`${match.url}/cart`} exact component={Cart} />
            <AdminRoute path={`${match.url}/admin/orders`} exact component={Orders} />
            <AdminRoute
                path={`${match.url}/admin/products`}
                exact
                component={ManageProducts}
            />
            <AdminRoute
                path={`${match.url}/admin/product/update/:productId`}
                exact
                component={UpdateProduct}
            />

          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
