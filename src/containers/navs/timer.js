import React from "react";

function getTimeRemaining(endtime) {
	const total = Date.parse(endtime) - Date.now(),
	    	seconds = Math.floor((total/1000) % 60),
	    	minutes = Math.floor((total/1000/60) % 60),
	    	hours12 = Math.floor((total/(1000*60*60)) % 24),
	    	hours24 = Math.floor((total/(1000*60*60))),
	    	days = Math.floor(total/(1000*60*60*24));
  
  return {
    total: total,
    days: days,
    hours12: hours12,
    hours24: hours24,
    minutes: minutes,
    seconds: seconds
  };
}

// this is for the random background color
const r = Math.floor(Math.random() * 255);
const g = Math.floor(Math.random() * 255);
const b = Math.floor(Math.random() * 255);
const backgroundColor = `rgb(${r}, ${g}, ${b})`;

class Clock extends React.Component {
	render() {
		return(
				<div style={{background: this.props.backgroundColor}} id={'mainContainerDivStyling'}>
					<div>TIME LEFT</div>
					<div>
						<span>{this.props.daysRemaining}:</span>
						<span>{this.props.hours12Remaining}</span>
						<span>{this.props.hours24Remaining}:</span>
						<span>{this.props.minutesRemaining}:</span>
						<span>{this.props.secondsRemaining}</span>
					</div>
				</div>
		)
	}
}

export default class Countdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
  		currentTime: Date.now(),
  		startTime: this.props.startTime,
  		endTime: this.props.endTime,
  		isAfter: false,
  		timeRemaining: null,
  		total: null,
  		days: null,
  		hours12: null,
  		hours24: null,
  		minutes: null,
  		seconds: null
		}
	}

	componentWillMount() {
		const whateverIntervalKey = setInterval(function() {
			const timeRemaining = getTimeRemaining(this.props.endTime);

			if ((timeRemaining.hours12 <= 0 || timeRemaining.hours24 <= 0) 
				&& timeRemaining.minutes <= 0 && timeRemaining.seconds <= 0) {

				// countdown style when it ends
				<Clock
					style={this.props.style}
				/>

      	clearInterval(whateverIntervalKey);
        
      	this.setState({
      		isAfter: true
      	});
        
    	} else {
				this.setState({
					days: timeRemaining.days,
					hours12: timeRemaining.hours12,
					hours24: timeRemaining.hours24,
					minutes: timeRemaining.minutes,
					seconds: timeRemaining.seconds
				});
			}
		}.bind(this), 1000);
	}

	onSecondPassed(event) {
		this.setState({
			endTime: event.target.value,
  		days: getTimeRemaining(this.state.endTime.days)
		});
	}

	render() {
		let content = null;
    
    content = <Clock
        style={this.props.style}
        backgroundColor={backgroundColor}
        onChange={this.onSecondPassed.bind(this)}
        daysRemaining={this.state.days}
        hours12Remaining={this.state.hours12}
        minutesRemaining={this.state.minutes}
        secondsRemaining={this.state.seconds}
    />

		const { bgColor } = this.state;

		return (
			<div>
				{ content }
			</div>
		)
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const endYear = getRandomInt(2018, 2099);
// console.log(endYear);

ReactDOM.render(<Countdown endTime={`"May 5" ${endYear}`} style={"display:none"} />, document.getElementById('app'));