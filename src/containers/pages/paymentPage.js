import React, { Component, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import $ from 'jquery'
// import { Label, Button, Row, Col } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getData, addCard, getCard } from '../../redux/paymentPage/action';
import { isAuthenticated } from "../../views/app/auth";
import Razorpay from 'razorpay';
import { Button } from 'react-yandex-maps';
import axios from 'axios';

var razorpay = new Razorpay({
    key_id: 'rzp_test_igd3N3CAkAeRcV',
    key_secret: 'rXLwbN77HeeIVma6EQDScJ3P'
});
const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;

var data = {
    'card[cvv]': "123",
    'card[expiry_month]': "02",
    'card[expiry_year]': "23",
    'card[name]': "akshay",
    'card[number]': "5104015555555558",
    'order_id': "order_DX5wGPRBirKutG",
    'amount': 2000,
    'contact': "9960525050",
    //'vpa': "mayurmahale9@okaxis", //for upi
    'email': "mayurmahale9@gmail.com",
    'method': "card"
    //'bank': 'HDFC', //for Netbanking

};
class Payment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            user: '',
            number: '',
            cvvNo: '',
            expiration: '',
            errMessage: '',
            cardBrand: '',
            isValid: null,
            cardStatus: '',
            currentDate: '',
            errMessageDate: '',
            holder: '',
            checkCard: true,
            showRzp: false
        }


    }

    componentWillMount() {
        this.setState({ user: userId })
    }

    // authHeader=()=>{
    //      if(token){
    //          console.log(token)
    //          return {'Authorization': 'Bearer '+ token};
    //      }
    //      else {
    //          return {};
    //      }

    // }
    componentDidMount() {
        this.props.getData();
        this.props.getCard(this.state.user);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }


    PayByRazorPay = () => {
        //     // let rza = razorpay.createPayment({
        //     const data = {
        //         amount: 10,
        //         email: 'gaurav.kumar@gmail.com',
        //         contact: '9123456780',
        //         order_id: 'order_DX5wGPRBirKutG',
        //         method: 'card',
        //         'card[name]': 'Gaurav Kumar',
        //         'card[number]': '4111111111111111',
        //         'card[cvv]': '566',
        //         'card[expiry_month]': '10',
        //         'card[expiry_year]': '20'
        //     }
        //     //   });


        //     // has to be placed within user initiated context, such as click, in order for popup to open.
        //     razorpay.createPayment(data);

        //     razorpay.on('payment.success', function (resp) {
        //         alert(resp)
        //         alert(resp.razorpay_order_id)
        //         alert(resp.razorpay_signature)
        //     }); // will pass payment ID, order ID, and Razorpay signature to success handler.

        //     razorpay.on('payment.error', function (resp) { alert(resp.error.description) }); // will pass error object to error handler

        //     console.log("razorpay", razorpay)
        var razorpay = new Razorpay({
            key: 'rzp_test_igd3N3CAkAeRcV', //Replace your merchant api key here
            image: 'https://i.imgur.com/n5tjHFD.pnghttps://i.imgur.com/n5tjHFD.png',
            redirect: 'true',
            callback_url: 'http://localhost:8080/Razorpay/ThankYou.php' //Kindly handle the payment response on this URL
        });

        razorpay.once('ready', function (response) {
            console.log(response.methods.netbanking);
            var nb = response.methods.netbanking;
            Object.keys(nb).forEach(function (key) {

                console.log(key, nb[key]);

            });
        })


        document.getElementById('rzp-button1').onclick = function (e) {
            razorpay.createPayment(data);

            razorpay.on('payment.success', function (resp) {
                console.log(resp)
            });

            razorpay.on('payment.error', function (resp) { console.log(resp.error.description) });
        }
    }

    addCard = (e) => {
        e.preventDefault();
        console.log('hii');
        this.setState({ show: true });
    }

    number = (e) => {
        e.preventDefault();
        this.setState({ errMessage: '', cardBrand: '', cardStatus: '', checkCard: true });
    }
    holder = (e) => {
        this.setState({ holder: e.target.value })
    }
    changeDate = () => {
        this.setState({ errMessageDate: '', checkCard: false });
        // var selectedText = document.getElementById('date').value;
        // var selectedDate = new Date(selectedText);
        // var now = new Date();
        // if (selectedDate < now) {
        //     this.setState({currentDate:'Date must be in future'})
        // }else{
        //     this.setState({ expiration: e.target.value })
        // }
    }

    changeExpiryDate = (e) => {
        // let checkCard=this.state.checkCard;
        // console.log(checkCard);

        console.log('onBlur');
        this.setState({ [e.target.name]: e.target.value });
        // axios.post('http://192.168.0.107:8000/api/validate/card',  {
        //     number,checkCard
        // }).then(res => {console.log(res)
        //     // this.setState({ cardBrand: res.data.response.brand})
        //     // if (res.data.response.validExpiration == true) {
        //     //     this.setState({ errMessageDate: '' })

        //     // }
        // }
        // )
        //     .catch(err =>{console.log(err.response)
        //          this.setState({ errMessageDate: 'plzz enter date in MM/DD' })
        //     }
        //          );

    }
    change = (e) => {
        let checkCard = this.state.checkCard;
        let number = e.target.value;
        console.log('onBlur');
        this.setState({ [e.target.name]: e.target.value });
        axios.post('http://192.168.0.107:8000/api/validate/card', {
            number, checkCard
        }).then(res => {
            this.setState({ cardBrand: res.data.response.brand })
            if (res.data.response.validCardNumber == true) {
                this.setState({ cardStatus: 'Card Number Approved', isValid: true })

            }
        }
        )
            .catch(err => this.setState({ errMessage: err.response.data.response, isValid: false }));

    }
    nameValidation = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    numberValidation = (event) => {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    submit = (e) => {
        e.preventDefault();
        console.log('state', this.state);
        this.props.value(this.state);
        this.props.addCard(this.state)
        this.props.getCard();
        this.setState({ show: false, cardBrand: '', errMessage: '', cardStatus: '', currentDate: '' });

    }
    getCards = ({ getCard }) => {
        if (getCard) {
            return getCard.map(item => {
                return (
                    <div>
                        <Row>
                            <Col xs="4">{item.number}</Col>
                            <Col xs="5">{item.holder}</Col>
                            <Col xs="3">{item.expiration}</Col>
                        </Row>
                        <hr />
                    </div>
                )
            })
        }

    }
    showData({ paymentData }) {
        if (paymentData) {
            let arr = [];
            let data = paymentData.methods.wallet
            for (let x in data) {
                arr.push(x);
            }
            return arr.map(item => {
                return (
                    <div>
                        <Row>
                            <Col xs="4">
                                <h5></h5>
                            </Col>

                            <Col xs="8">
                                <h5>{item}</h5>
                            </Col>

                        </Row>
                        <hr />
                    </div>
                )
            })
        }
    }


    render() {
        // console.log('asdbchadbsc');
        return (
            <div>
                <div className="card ">
                    <h2 className="mt-2"><b>Payment Options</b></h2>
                </div>
                <div className='mt-1  ml-3 mb-2'><span>CREDIT/DEBIT CARD</span></div>
                {this.state.show ? <div className="card">
                    <div className=" jumbotron border border-dark ">

                        <h3>Enter Card Details</h3>
                        <div><input type="text" name='holder' onKeyPress={this.nameValidation} maxLength={30} placeholder='Enter Card Holder Name' onChange={this.holder} style={{ marginBottom: '5px' }} /></div>
                        <div><input type="text" name='number' onKeyPress={this.numberValidation} maxLength={16} placeholder='Enter Card No' onChange={this.number} onBlur={this.change} style={{ marginBottom: '5px' }} />{this.state.cardBrand}</div>
                        {this.state.isValid ? <div><span style={{ color: 'green' }}>{this.state.cardStatus}</span></div> : <div><span style={{ color: 'red' }}>{this.state.errMessage}</span></div>}

                        {/* <div><input type="number" name='cvvNo' placeholder='Enter cvv no ' onChange={this.change} style={{ marginBottom: '5px', marginTop: '5px' }} /></div> */}
                        <div><input type="text" name='expiration' placeholder='Enter expiry no ' onChange={this.changeDate} onBlur={this.changeExpiryDate} style={{ marginTop: '5px' }} /></div>
                        <div><span style={{ color: 'red' }}>{this.state.errMessageDate}</span></div>
                        <div><button onClick={this.submit} style={{ marginTop: '5px', border: '1px solid orange', background: 'white' }}>Submit</button></div>
                    </div>

                </div>
                    : ''}
                <div className="card mt-3">
                    <div className="mt-4 ml-2">
                        <Row>
                            <Col xs="3">
                                <button style={{ margin: '0px 0px 0px 10px', border: '1px solid orange', background: 'white' }}
                                    onClick={this.addCard}
                                >+</button>
                            </Col>
                            <Col xs="9">
                                <div><strong className="text-warning"><b>ADD A NEW CARD</b></strong></div>
                                <div><h5>Save and pay via Cards</h5></div>
                            </Col>
                        </Row>
                        <hr />
                        <div>
                            <Row>
                                <Col xs="4"><b>Account Number</b></Col>
                                <Col xs="5"><b>Card Name</b></Col>
                                <Col xs="3"><b>Expiry Date</b></Col>
                            </Row>
                            <hr />
                            {this.getCards(this.props.payment)}
                        </div>
                    </div>
                </div>
                <div className="ml-3 mt-2"><span>UPI</span></div>
                <div className="card mt-2">
                    <div className="mt-2 ml-2">
                        <Row>
                            <Col xs="3">
                                <button style={{ margin: '0px 0px 0px 10px', border: '1px solid orange', background: 'white' }}>+</button>
                            </Col>
                            <Col xs="9">
                                <div><strong style={{ color: 'orange' }}>ADD A NEW UPI</strong></div>
                                <div><h5>You need to have a registered UPI Id</h5></div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="m-2">Wallets</div>
                <div className="card mt-2">
                    <Row>

                        <Col xs="4">

                        </Col>
                        <Col xs="8">
                            <div>
                                <h4 className="mt-2">Types Of Wallets</h4>
                            </div>
                        </Col>

                    </Row>
                    <hr />
                    
                    {/* {/* <button onClick={this.razorpay}>Click Me</button> */}
                    {this.showData(this.props.payment)}

                    {/* <div className="mt-2">
                        <Row>
                            <Col xs="3">
                                <span className="ml-2"><img src="https://cdn.razorpay.com/bank/HDFC.gif"/></span>
                            </Col>
                            <Col xs="5">
                                <div><h5>Amazon Pay</h5></div>
                            </Col>
                            <Col xs="4">
                                <a className='nav-link text-warning'>Link Account</a>
                            </Col>

                        </Row>
                    </div>
                    <hr />


                    <div className="mt-2">
                        <Row>
                            <Col xs="3">
                                <span className="ml-2"><img src="https://cdn.razorpay.com/app/phonepe.svg"/></span>
                            </Col>
                            <Col xs="5">
                                <div><h5>Phone Pay</h5></div>
                            </Col>
                            <Col xs="4">
                                <a className='nav-link text-warning'>Link Account</a>
                            </Col>
                        </Row>
                    </div>
                    <hr />


                    <div className="mt-2">
                        <Row>
                            <Col xs="3">
                                <span className="ml-2"><img src="https://cdn.razorpay.com/app/paytm.svg"/></span>
                            </Col>
                            <Col xs="5">
                                <div><h5>Paytm</h5></div>
                            </Col>
                            <Col xs="4">
                                <a className='nav-link text-warning'>Link Account</a>
                            </Col>
                        </Row>
                    </div>

                    <div className="mt-2">
                        <Row>
                            <Col xs="3">
                                <span className="ml-2">Image</span>
                            </Col>
                            <Col xs="5">
                                <div><h5>Mobiwik</h5></div>
                            </Col>
                            <Col xs="4">
                                <a className='nav-link text-warning'>Link Account</a>
                            </Col>
                        </Row>
                    </div>
                    <hr />

                    <div className="mt-2">
                        <Row>
                            <Col xs="3">
                                <span className="ml-2"><img src="https://cdn.razorpay.com/app/googlepay.svg"/></span>
                            </Col>
                            <Col xs="5">
                                <div><h5>Google Pay</h5></div>
                            </Col>
                            <Col xs="4">
                                <a className='nav-link text-warning'>Link Account</a>
                            </Col>
                        </Row>
                    </div> */}

                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    // console.log(state)
    return {
        payment: state.payment
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getData,
        addCard,
        getCard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);