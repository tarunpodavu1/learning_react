import React, { Component } from 'react';
import Modal from './components/Modal';
import './App.css';
import { recipeLists } from './Data/data';

class App extends Component {
  state = {
    showModal: false,
    recipes: recipeLists,
    title: undefined,
    instruction: undefined,
    ingredients: undefined,
    search: '',
    mode: -1,
    showView: false,
  };

  handleModal = () => {
    this.setState({ ...this.state,mode: -1, showModal: true });
  };

  handleCancel = () => {
    this.setState({ ...this.state, showModal: false, showView: false });
  };

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

  handleView =  (e) => {
    this.setState({ ...this.state,mode: 0, showView: true });
    
  };
  onSearchHandler = (event) => {
    const searchFieldString = event.target.value;
    this.setState({...this.state, search: searchFieldString})
    
  }

   
    // this.setState({...this.state, recipes: newRecipes})
    // const newRecipes = 
    // this.state.recipes.
    // filter(recipe => return {recipe.title.toLocaleLowerCase().includes(this.state.searchField))}

  render() {

    const {recipes, search} = this.state
    const newRecipes = recipes.filter(recipe => recipe.title.includes(search))
    return (
      <div>
        <div className="headContent">
          <h1 className="title">Recipe Book</h1>
          <input className="searchBar" name='search' value={this.state.search} onChange={this.onSearchHandler} type="text" />
          <button onClick={this.handleModal} className="addbutton">
            Add Recipe
          </button>
        </div>
        <div className="recipeContainer">
      
          {newRecipes.map((recipe, id) => (
            <div className="recipeCard" key={id}>
              <h2>{recipe.title}</h2>
              <button onClick={this.handleView}>View more</button>
              {/* modal */}
              {this.state.showView && (
                <Modal className="modalBg">
                  <div className='pop'>
                    <h1>{recipe.title}</h1>
                    <h2>Ingredients</h2>
                    <ul>
                      {recipe.ingredients.map( (ingredient, i) => <li key={i}>{ingredient}</li>)}
                    </ul>
                    <h2>Instruction</h2>
                    <p>{recipe.instruction}</p>
                    <button className='add' onClick={this.handleCancel}>Cancel</button>
                  </div>
                </Modal>
              ) }

            </div>
          ))}
        </div>
        {/* modal */}
        {this.state.showModal && (
          <Modal className="modalBg">
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
          </Modal>
        )}

        {/* {(this.state.showModal && this.state.mode=== 0 ) && (
          <Modal className="modalBg">
            <div className='pop'>
              <h1></h1>
            </div>
          </Modal>
        ) } */}


      </div>
    );
  }
}

export default App;
