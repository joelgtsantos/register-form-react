import React from 'react';
import PropTypes from 'prop-types';
import Countries from './api/countries.json';
import States from './api/states.json'

const Selects = {
	countries: Countries,
	states: States
}

const SELECT_COUNTRY = 'countries';

class RegionSelect extends React.Component {
	static propTypes = {
		country: PropTypes.string,
		state: PropTypes.string,
		onChange: PropTypes.func.isRequired
	};

	state = {
		country: null,
		state: null, 
		countries: [],
		states: [],
		error: null,
		_loading: true //Presentational state convention
	}

  componentDidMount() {
    this.getCountries();
  }
  
  componentWillReceiveProps(update) {
    this.setState({ country: update.country });
  }

  getCountries = () => {
    console.log("Loadingasdkjfasd");
    apiClient(SELECT_COUNTRY)
      .then((countries) => (
        this.setState({
          _loading: false,
          countries: countries
        })
       ));
  };

  onSelectCountry = (evt) => {
  	//get value
  	const value = evt.target.value;

  	//Error validate
  	const error = this.props.validate ? this.props.validate(value) : false;

  	//set state with a new value
  	this.setState({ country: value, error});

  	//propagate error
  	this.props.onChange({name: 'country', value, error});

  }

	renderCountrySelect = () => {
		return (
			<div>
			  <select 
				onChange={this.onSelectCountry}
				value={this.state.country || ''}
			  >
				{[
				<option value='' key='country-none'>
					Which country?
				</option>,
				...this.state.countries.map( (country, i) => (
						<option value={country} key={i}>
							{country}
						</option>
					))
					]
				}
			  </select>
			  <span style={{ color: 'red' }}>{ this.state.error }</span>
			</div>
		);

	}

	render(){
		return(
			<div>
				{ this.renderCountrySelect() }
			</div>
		);
	}
};

export default RegionSelect;

function apiClient(option) {
  return {
    then: function (cb) {
      setTimeout(() => { cb(Selects[option]); }, 1000);
    },
  };
}
