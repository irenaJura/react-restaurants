import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);

        this.fetchResults = this.fetchResults.bind(this);
    }

    handleChange(e){
        this.setState({ value: e.target.value });
    }

    onSearchSubmit(value){
        // using the city parametar
        this.fetchResults();
    }

    fetchResults(url){
        fetch(`http://opentable.herokuapp.com/api/restaurants?city=${this.state.value}`)
            .then(data => data.json())
            .then((data) => {
                this.setState((prev, props) => ({
                    restaurants: data.restaurants
                }));
            });
    }

    render() {
        return (
            <div className="App">
                <br/>
                <div className='search-container'>
                    <div className='search-text'>Enter city name for restaurants.</div>
                    <input type='text' className='search-bar' placeholder='Toronto' onChange={ this.handleChange }/>
                    <input type='submit' className='search-submit' onClick={ this.onSearchSubmit }/>
                </div>
                <br/>

                <div className='results-content'>
                  {this.state.restaurants.map(restaurant => (
                    <div  key={restaurant.id}>
                      <div>Name: {restaurant.name}</div>
                      <div>Address: {restaurant.address}, {restaurant.city}</div>
                      <div>Price: {restaurant.price}</div>
                      <br/>
                    </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default App;
