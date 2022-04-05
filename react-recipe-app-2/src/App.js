import React, { Component } from 'react';
import Modal from './components/Modal';
import './App.css';
import { recipeLists } from './Data/data';
import RecipeCard from './components/RecipeCard';

class App extends Component {
  state = {
    showModal: false,
    recipes: recipeLists,
    title: undefined,
    instruction: undefined,
    ingredients: undefined,
    search: '',
    mode: -1,

  };

  handleModal = () => {
    this.setState({...this.state, showModal: true})
  };
  handleCancel = () => {};
  handleOnChange = (e) => {

    const { name, value } = e.target;
    if (name === 'ingredients') {
      return this.setState({
        ...this.state,
        [name]: [value],
      });
    }
    this.setState({
      ...this.state,
      [name]: value,
    });

  };
  handleAdd = (e) => {


    e.preventDefault();
    const recArray = [...this.state.recipes];
    const { title, ingredients, instruction, recipes } = this.state;
    recArray.push({
      title: title,
      ingredients: ingredients,
      instruction: instruction,
    });
    this.setState({ ...this.state, recipes: recArray });

    this.clearInputs()


  };


  clearInputs = () => {
    this.setState({title:'', ingredients:'', instruction:''})
  }


  handleView = () => {};

  handleCancel = () => {
    this.setState({ ...this.state, showModal: false });
  };

  onSearchHandler = (event) => {
    const searchFieldString = event.target.value;
    this.setState({ ...this.state, search: searchFieldString });
  };

  render() {
    // Filtering on Seacrh Terms
    const { recipes, search, showModal } = this.state;
    const newRecipes = recipes.filter((recipe) =>
      recipe.title.includes(search)
    );

    return (
      <div>

        {/* Header */}
        <div className="headContent">
          <h1 className="title">Recipe Book</h1>

          {/* Search */}
          <input
            className="searchBar"
            name="search"
            value={this.state.search}
            onChange={this.onSearchHandler}
            type="text"
          />
          <button onClick={this.handleModal} className="addbutton">
            Add Recipe
          </button>
        </div>

        {/* Recipes Container */}
        <div className="recipeContainer">
          {newRecipes.map((recipe, i) => (
            // Recipe Card
            <RecipeCard key={i} recipe={recipe} />
          ))}
        </div>
        







          {this.state.showModal && 
          
          
          <div className="modalBg">
          <div className="pop">
            <form onSubmit={this.handleAdd}>
              <h1>Add Your Recipe</h1>
              <h2>Title</h2>
              <input
                name="title"
                value={this.state.title}
                className="inputFields"
                type="text"
                onChange={this.handleOnChange}
                required
              />
              <h2>Ingredients</h2>
              <input
                name="ingredients"
                value={this.state.ingredients}
                className="inputFields"
                type="text"
                onChange={this.handleOnChange}
                required
              />
              <h2>Instruction</h2>
              <textarea
                value={this.state.instruction}
                name="instruction"
                className="inputFields"
                onChange={this.handleOnChange}
                required
              />
              <button className="add" type="submit">
                Add
              </button>
              <button className="add" onClick={this.handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
          
          }




      </div>
    );
  }
}

export default App;
