import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search.css';
import { list } from "./apiCore";
import Searchs from "../home/search";
import { withRouter,Link } from "react-router-dom";

export class Autocomplete extends Component {
  constuctor() {
    this.onMen = this.onMen.bind(this);
  }

  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ''
  };

  componentDidMount(){
      //console.log(this.testInput)
      setTimeout(() => { this.testInput && this.testInput.focus() }, 1);
  }

  onChange = (e) => {
    //console.log('onChanges');

    const { options } = this.props;
    //console.log(options);
    const userInput = e.currentTarget.value;
    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,

      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onMen = () =>{
    let path= `/app/men`;
    this.props.history.push(path);
  }

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
      this.searchData(e.currentTarget.innerText);
  };

  searchData = (userInput) => {
        // console.log(search, category);
        const { results } = this.state;
        if (userInput) {
            list({ search: userInput || undefined }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        //console.log(response);
                        this.setState({ results: response });
                    }
                }
            );
        }
    };

  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput, results }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                  <span className="float-right"><i className="simple-icon-cursor"></i></span>
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <h4></h4>
          </div>
        );
      }
    }else {
      optionList = (
          <ul className="options">
          <h2 className="trending">Trending Products</h2>
            
            <Link to="/app/men">
                <li>
                   Men Clothing
                  <span className="float-right"><i className="iconsminds-t-shirt"></i></span>
                </li>
             </Link>
                
                <li>
                  Phone Covers
                  <span className="float-right"><i className="iconsminds-smartphone-4"></i></span>
                </li>
          </ul>
        );
    }
    return (
      <React.Fragment>
      <div className="autocomplete">
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput || ''}
            ref={(input) => { this.testInput = input; }}
            placeholder="Search for Products, Brands and More"
          />
          <input type="submit" value="" className="search-btn" />
        </div>
        </div>
        {optionList}

         <Searchs results={results} />
       
      </React.Fragment>
    );
  }
}

export default  withRouter(Autocomplete);
