import React from "react";
import { shallow } from "enzyme";
import App from "./App.js";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("testing App component", () => {
  test("Header content", () => {
    const component = shallow(<App />);
    expect(component.find(".headContent").find("h1").text()).toBe(
      "Recipe Book"
    );
    expect(
      component.find(".headContent").find("input").props().className
    ).toEqual("searchBar");
    expect(component.find(".headContent").find("button").text()).toEqual(
      "Add Recipe"
    );
  });

  test("Recipe container", () => {
    const component = shallow(<App />);
    const recipes = component
      .find(".recipeContainer")
      .find(".recipeCard")
      .map((child) => child.text());
    expect(recipes).toEqual([
      "Oreo Milk ShakeView more",
      "Banana Milk ShakeView more",
      "Strawberry Milk ShakeView more",
      "Apple Milk ShakeView more",
      "Chocolate Milk ShakeView more",
      "Blueberry ShakeView more",
    ]);
    expect(component.find(".recipeContainer").find("button").length).toBe(6);
  });

  test("Add Recipe", () => {
    const component = shallow(<App />);
    const addRecipeButton = component.find(".headContent").find("button");
    addRecipeButton.simulate("click");
    const modal = component.find("Modal");
    expect(modal.find(".modalBg")).toBeTruthy();
    expect(modal.find(".pop").find("h1").text()).toBe("Add Your Recipe");
    expect(modal.find(".pop").find("h2").at(0).text()).toBe("Title");
    expect(modal.find(".pop").find("h2").at(1).text()).toBe("Ingredients");
    expect(modal.find(".pop").find("h2").at(2).text()).toBe("Instruction");
    expect(modal.find(".pop").find("textarea").length).toBeTruthy();
    expect(modal.find(".pop").find("button").at(0).text()).toBe("Add");
    expect(modal.find(".pop").find("button").at(1).text()).toBe("Cancel");
    const inputFields1 = modal.find(".pop").find("input").at(0);
    const inputFields2 = modal.find(".pop").find("input").at(1);
    const textarea = modal.find(".pop").find("textarea");
    inputFields1.simulate("change", {
      target: { name: "title", value: "Bread Toast" },
    });
    inputFields2.simulate("change", {
      target: { name: "ingredients", value: "Bread slices,egg,milk,sugar" },
    });
    const addBuuton = modal.find(".pop").find("button").at(0);
    addBuuton.simulate("click");
    expect(component.state().recipes.length).toBe(6);
    textarea.simulate("change", {
      target: {
        name: "instruction",
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    });
    addBuuton.simulate("click");
    expect(component.state().recipes[6].ingredients).toStrictEqual([
      "Bread slices",
      "egg",
      "milk",
      "sugar",
    ]);
    expect(component.state().recipes.length).toBe(7);
    expect(component.state().title).toBe("");
    expect(component.state().ingredients).toBe("");
    expect(component.state().instruction).toBe("");
  });

  test("pop and pop out Modal", () => {
    const component = shallow(<App />);
    const addRecipeButton = component.find(".headContent").find("button");
    addRecipeButton.simulate("click");
    expect(component.find("Modal").length).toBe(1);
    const cancelButton = component
      .find("Modal")
      .find(".pop")
      .find("button")
      .at(1);
    cancelButton.simulate("click");
    expect(component.find("Modal").length).toBe(0);
  });

  test("display recipe modal", () => {
    const component = shallow(<App />);
    const viewMoreButton = component
      .find(".recipeContainer")
      .find("button")
      .at(5);
    viewMoreButton.simulate("click");
    expect(component.find("Modal").length).toBe(1);
    const modal = component.find("Modal");
    expect(modal.find(".pop").find("h1").text()).toBe("Blueberry Shake");
    expect(modal.find(".pop").find("h2").at(0).text()).toBe("Ingredients");
    const ingredients = modal
      .find("ul")
      .find("li")
      .map((child) => child.text());
    expect(ingredients).toStrictEqual([
      "Blueberry",
      "Milk",
      "Sugar",
      "Ice cream",
      "Chocolate chip",
    ]);
    expect(modal.find(".pop").find("h2").at(1).text()).toBe("Instruction");
    expect(modal.find(".pop").find("p").length).toBe(1);
    const cancelButton = modal.find(".pop").find("button");
    expect(cancelButton.text()).toBe("Cancel");
    cancelButton.simulate("click");
    expect(component.find("Modal").length).toBe(0);
  });
  test("Search Bar", () => {
    const component = shallow(<App />);
    const searchBar = component.find(".headContent").find("input");
    searchBar.simulate("change", {
      target: { name: "search", value: "B" },
    });
    expect(component.find(".recipeContainer").find(".recipeCard").length).toBe(
      2
    );
    searchBar.simulate("change", {
      target: { name: "search", value: "zpo" },
    });
    expect(component.find(".recipeContainer").find(".recipeCard").length).toBe(
      0
    );
  });
});
