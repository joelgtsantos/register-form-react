import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer }  from './redux-reducer';
import { fetchPeople, savePeople }  from './redux-actions.js';
import Form  from './component-form';
import './App.css';
import './semantic-dist/semantic.min.css';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form);

class App extends React.Component {

	componentWillMount(){
		store.dispatch(fetchPeople());
	}

  render() {
    return (
    	<Provider store={store}>
    		<ReduxForm />
    	</Provider>
    );
  }
};

function mapStateToProps(state){
	return {
		isLoading: state.isLoading,
		fields: state.person,
		people: state.people,
		saveStatus: state.saveStatus,
	};
}

function mapDispatchToProps(dispatch){
	return {
		onSubmit: (people) => {
			dispatch(savePeople(people));
		}
	};
}

export default App;
