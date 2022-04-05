import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  const [viewModal, setViewModal] = useState(false);

  const handleCancel = () => {
    setViewModal(false);
  };

  const clickHandler = () => {
    setViewModal(true);
  };

  return (
    <>
      
        <div className="recipeCard">
          <h2>{recipe.title}</h2>
          <button onClick={clickHandler}>View more</button>
        </div>
      
      
      {/* Modal */}
      {viewModal && (
        <div className="modalBg">
          <div className="pop">
            <h1>{recipe.title}</h1>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            <h2>Instruction</h2>
            <p>{recipe.instruction}</p>
            <button className="add" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
