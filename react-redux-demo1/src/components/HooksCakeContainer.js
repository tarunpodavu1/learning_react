import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyCake } from "../redux";

const HooksCakeContainer = () => {
  //Same as mapStateToProps in CakeContainer
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  //Same as mapDispatchToProps in CakeContainer
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Num of Cakes - {numOfCakes}</h2>
      <button onClick={() => dispatch(buyCake())}>Buy cake</button>
    </div>
  );
};

export default HooksCakeContainer;
