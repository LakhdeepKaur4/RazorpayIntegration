import React, { Component,Fragment } from 'react';
import Fullscreen from "react-full-screen";
import Stories from 'react-insta-stories'
import Error from "../../../views/error";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

export default class PopUp extends Component {
  constructor(props) {
    super();
 
    this.state = {
      isFull: false,
    };
     this.handleExitFullScreenClick = this.handleExitFullScreenClick.bind(this);
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

   handleExitFullScreenClick() {
    this.setState({ isFull: false });
  }

  render () {
    return (
      <Row>
          <Colxx xxs="12" className="pl-0 pr-0 mb-5">

          <button className="btntransparent" onClick={this.goFull}>
           <img alt="Profile" src="/assets/img/profile-pic-l-2.jpg" className="rounded" width='40'/>
          </button>

          <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
          <div className="full-screenable-node">
          {this.state.isFull?

            <Fragment>
            <button className="button btncls" onClick={this.handleExitFullScreenClick}><i className="iconsminds-close" /></button>

              <Stories
              stories={stories}
              defaultInterval={1500}
              storyStyles={storyContent}
            />
            </Fragment>

            :" "

             }

          </div>
        </Fullscreen>
          </Colxx>
        </Row>
    )
  }
}
 
const stories = [{
    url: '/assets/img/status1.jpg',
    seeMore: <Error />,
    header: {
        heading: 'Priyance Mangla', subheading: 'Posted 5h ago', profileImage: '/assets/img/profile-pic-l-2.jpg'
    }
},
{
    url: '/assets/img/sample2.jpg',
    header: {
        heading: 'Stories', subheading: 'Posted 32m ago', profileImage: '/assets/img/profile-pic-l-5.jpg'
    }
},
{
    url: '/assets/img/sample3.jpg',
    header: {
        heading: 'Colours', subheading: 'Posted 32m ago', profileImage: '/assets/img/profile-pic-l.jpg'
    }
}]


const storyContent = { 
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto'
 }