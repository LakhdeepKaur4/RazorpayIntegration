import React, { useState, useEffect } from "react";
import {
    getProducts,
    getBraintreeClientToken,
    processPayment,
    createOrder,
    getPaymentOptions
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import PaymentPage from '../../../containers/pages/paymentPage';
import axios from "axios";
import { Row, Col, Button } from 'reactstrap';
// import Razorpay from 'razorpay';



var razorpay = new window.Razorpay({
    key: 'bsKkX8SdZRAiKFDWdR3oeTbcV',
    key_secret: 'rzp_test_DUi6OPmtPxMldq'
});
let globalData = {
    'contact': "9960525050",
    //'vpa': "mayurmahale9@okaxis", //for upi
    'email': "mayurmahale9@gmail.com",
    'method': "card",
}
const Checkout = ({ products }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: "",
        number: "",
        cvvNo: "",
        expiryDate: "",
        price: "",
        orderId: '',
        show: false,
        cardBrand: '',
        isvalid: null,
        cardStatus: '',
        errMessage: '',
        errMessageDate: '',
        showProceedButton: true,
        showBuyButton: false,
        showRzp: false,
        holder: '',
        checkCard: true
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };



    useEffect(() => {
        getToken(userId, token);
        razorpay.once('ready', function (response) {
            var nb = response.methods.netbanking;
            Object.keys(nb).forEach(function (key) {


            });
        })
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };
    let amount;
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            amount = currentValue + nextValue.count * nextValue.pricing;
            return amount;

        }, 0);

    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>
                {showDropIn()}
            </div>
        ) : (
                <Link to="/app/signin">
                    <button className="btn btn-primary btn-block">Sign in to checkout</button>
                </Link>
            );
    };



    let arr = [];
    let order = {};
    let mainOrder = {};
    let deliveryAddress = data.address;
    const proceed = () => {
        products.map(item => {
            let entry1 = {};
            entry1._id = item._id;
            entry1.name = item.name;
            entry1.pricing = item.pricing;
            entry1.count = item.count;
            arr.push(entry1);


        });
        order.amount = amount * 100;
        order.address = data.address;
        order.products = arr;
        mainOrder.order = order;

        axios.post(`http://192.168.0.107:8000/api/order/create/${userId}`,
            mainOrder, { headers: authHeader() })
            .then(response => {
                globalData['order_id'] = response.data.razorpay_order_id
                setData({
                    ...data,
                    showProceedButton: false, showBuyButton: true
                })
            })
    }

    let authHeader = () => {
        if (token) {
            return { 'Authorization': 'Bearer ' + token };
        }
        else {
            return {};
        }

    }

    const changeCvv = (e) => {
        globalData['card[cvv]'] = e.target.value.toString();
    }


    const buy = () => {
        globalData['amount'] = amount * 100;
        setData({ ...data, loading: true, price: amount, show: true, showBuyButton: false });


        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        // let nonce;
        // let getNonce = data.instance
        //     .requestPaymentMethod()
        //     .then(data => {
        //         nonce = data.nonce;
        //         // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        //         // and also total to be charged
        //         // console.log(
        //         //     "send nonce and total to process: ",
        //         //     nonce,
        //         //     getTotal(products)
        //         // );
        //         const paymentData = {
        //             paymentMethodNonce: nonce,
        //             amount: getTotal(products)
        //         };

        //         processPayment(userId, token, paymentData)
        //             .then(response => {
        //                 console.log(response);
        //                 // empty cart
        //                 // create order

        //                 const createOrderData = {
        //                     products: products,
        //                     transaction_id: response.transaction.id,
        //                     amount: response.transaction.amount,
        //                     address: deliveryAddress
        //                 };

        //                 createOrder(userId, token, createOrderData)
        //                     .then(response => {
        //                         emptyCart(() => {
        //                             console.log(
        //                                 "payment success and empty cart"
        //                             );
        //                             setData({
        //                                 loading: false,
        //                                 success: true
        //                             });
        //                         });
        //                     })
        //                     .catch(error => {
        //                         console.log(error);
        //                         setData({ loading: false });
        //                     });
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //                 setData({ loading: false });
        //             });
        //     })
        //     .catch(error => {
        //         // console.log("dropin error: ", error);
        //         setData({ ...data, error: error.message });
        //     });
    };
    const getData = (e) => {
        setData({ ...data, cardNo: e.cardNo, cvvNo: e.cvvNo, expiryDate: e.expiryDate })
    }
    let nameValidation = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    let numberValidation = (event) => {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    let holder = (e) => {
        globalData['card[name]'] = e.target.value;
        // setData({ ...data,holder: e.target.value })
    }
    let number = (e) => {
        e.preventDefault();
        globalData['card[number]'] = e.target.value.toString();
        setData({ ...data, errMessage: '', cardBrand: '', cardStatus: '', checkCard: true });
    }
    let change = (e) => {

        let checkCard = data.checkCard;
        let number = e.target.value;

        setData({ ...data });
        axios.post('http://192.168.0.107:8000/api/validate/card', {
            number, checkCard
        }).then(res => {
            setData({ ...data, cardBrand: res.data.response.brand })
            if (res.data.response.validCardNumber == true) {
                setData({ cardStatus: 'Card Number Approved', isValid: true, show: true })

            }
        }
        )
            .catch(err =>
                setData({ errMessage: err.response.data.response, isValid: false, show: true })
            );

    }
    let changeDate = (e) => {
        let exp = e.target.value.toString();
        let expMonth = exp.split('/');
        globalData['card[expiry_month]'] = expMonth[0];
        globalData['card[expiry_year]'] = expMonth[1];
        setData({ ...data, errMessageDate: '', checkCard: false });;
        // var selectedText = document.getElementById('date').value;
        // var selectedDate = new Date(selectedText);
        // var now = new Date();
        // if (selectedDate < now) {
        //     this.setState({currentDate:'Date must be in future'})
        // }else{
        //     this.setState({ expiration: e.target.value })
        // }
    }
    let changeExpiryDate = (e) => {
        // let checkCard=this.state.checkCard;

        // setData({...data, [e.target.name]: e.target.value });
        // axios.post('http://192.168.0.107:8000/api/validate/card',  {
        //     number,checkCard
        // }).then(res => {
        //     // this.setState({ cardBrand: res.data.response.brand})
        //     // if (res.data.response.validExpiration == true) {
        //     //     this.setState({ errMessageDate: '' })

        //     // }
        // }
        // )
        //     .catch(err =>{
        //          this.setState({ errMessageDate: 'plzz enter date in MM/DD' })
        //     }
        //          );

    }
    let submit = (e) => {
        e.preventDefault();
        // this.props.value(this.state);
        // this.props.addCard(this.state)
        // this.props.getCard();
        setData({ show: false, cardBrand: '', errMessage: '', cardStatus: '', currentDate: '', showRzp: true });

    }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                        {data.showProceedButton == undefined ?
                            <div className="mt-3"><Row><Col xs="12" >
                                <Button className="btn btn-success" style={{ width: 'inherit' }} onClick={proceed}>Proceed To Buy</Button></Col></Row>
                            </div> : <div className="mt-3" style={{textAlign:'center'}}><h3><b> *Scroll Down To Proceed*    </b></h3></div>}
                    </div>
                    <PaymentPage
                        value={getData}
                    />
                    {/* <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {   
                                flow: "vault"
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    /> */}
                    {data.show ? <div className="card mt-2 border border-dark">
                        <div className="  mt-2 ml-2 mb-1">

                            <h3>Enter Card Details</h3>
                            <div><input type="text" name='holder' onKeyPress={nameValidation} maxLength={30} placeholder='Enter Card Holder Name' onChange={holder} style={{ marginBottom: '5px' }} /></div>
                            <div><input type="text" name='number' onKeyPress={numberValidation} maxLength={16} placeholder='Enter Card No' onChange={number} onBlur={change} style={{ marginBottom: '5px' }} />{data.cardBrand}</div>
                            {data.isValid ? <div><span style={{ color: 'green' }}>{data.cardStatus}</span></div> : <div><span style={{ color: 'red' }}>{data.errMessage}</span></div>}

                            <div><input type="number" name='cvvNo' placeholder='Enter cvv no 'max={3} onChange={changeCvv} style={{ marginBottom: '5px', marginTop: '5px' }} /></div>
                            <div><input type="text" name='expiration' placeholder='Enter expiry no 'max={4} onChange={changeDate} style={{ marginTop: '5px' }} /></div>
                            <div><span style={{ color: 'red' }}>{data.errMessageDate}</span></div>
                            <div><button onClick={submit} style={{ marginTop: '5px', border: '1px solid orange', background: 'white' }}>Submit</button></div>
                        </div>

                    </div>
                        : ''}
                    {data.showBuyButton ? <button onClick={buy} className="btn btn-success btn-block">Pay</button> : ''}
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = success => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading =>
        loading && <h2 className="text-danger">Loading...</h2>;


    return (
        <div>
            <h2>Total: ₹ {getTotal()}</h2>


            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {/* {showError(data.error)} */}
            {showCheckout()}
            {data.showRzp ?
                <div className="mt-2"><Row><Col xs="12"><button style={{ width: 'inherit' }}
                    className="btn btn-success" id="rzp-button1" onClick={(function (e) {
                        razorpay.createPayment(globalData);
                        razorpay.on('payment.success', function (resp) {

                        });
                        razorpay.on('payment.error', function (resp) { 
                            console.log(resp.error)
                         });


                    })}>
                    Pay With Razorpay</button></Col></Row></div> : ''}
        </div>
    );
};

export default Checkout;
