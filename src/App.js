import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            value: '',
            isLoading: false,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);

        this.fetchResults = this.fetchResults.bind(this);
    }

    handleChange(e){
        this.setState({ value: e.target.value });
    }

    onSearchSubmit(e){
        // using the city parametar
        e.preventDefault();
        this.fetchResults();
    }

    fetchResults(url){
       this.setState({ isLoading: true });
        fetch(`https://opentable.herokuapp.com/api/restaurants?city=${this.state.value}`)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Something went wrong ...');
              }
            })
            .then(data => this.setState({ restaurants: data.restaurants, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {

      const { isLoading, error } = this.state;

      if (error) {
      return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p className="App">Loading ...</p>;
      }
       else {
          return (
              <div className="App">
               
                  <form onSubmit={ this.onSearchSubmit }>
                      <div className='search-text'>Enter city name to find restaurants</div>
                      <input type='text' className='search-bar' placeholder='city' onChange={ this.handleChange }/>
                      <input type='submit' className='search-submit' value='Search'/>
                  </form>
               

                  <div className='results-content'>
                    {this.state.restaurants.map(restaurant => (
                      <div key={restaurant.id} className="card-content">
                        <div className="margin-img"><img src={restaurant.image_url} alt={restaurant.name}/></div>
                        <div>Name: <span className="accent">{restaurant.name}</span></div>
                        <div>Address: <span className="accent">{restaurant.address}, {restaurant.city}</span></div>
                        <div>Price: <span className="accent">{restaurant.price}</span></div>
                        <br/>
                      </div>
                      ))}
                  </div>
              </div>
            )
         }  
    }
}

export default App;
