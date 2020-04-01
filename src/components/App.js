import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';

class App extends React.Component {
  state = { results: '' };

  componentDidMount(term='pikachu') {
    this.onTermSubmit(term);
  }

  onTermSubmit = async term => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`);

    this.setState({
        results: response.data,
    });
  };

  render() {
    if(!this.state.results) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="ui container">
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <div className="field">
            <img className="ui medium image" src={this.state.results.sprites.front_default} alt=""/>
            <ul>
              <li>Name: {this.state.results.forms[0].name.toUpperCase()}</li>
              <li>Height: {this.state.results.height}</li>
              <li>Weight: {this.state.results.weight}</li>
              <li>Attact: {this.state.results.abilities[0].ability.name.toUpperCase()}</li>
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default App;