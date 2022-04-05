import React from "react";
import App from "./App";
import Restaurant from "./components/restaurant";
import { shallow, mount } from "enzyme";

describe("testing table booking", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Restaurant />)));

  it("testing the tables", () => {
    const cards = wrapper.find(".card");
    expect(cards).toHaveLength(20);
  });
  it("testing the tables", () => {
    let text = wrapper.find(".card").map((child) => child.text());
    expect(text).toEqual([...Array(20)].map((a) => ""));
  });
  it("testing the handlers", () => {
    const cards = wrapper.find(".list");
    cards.at(0).simulate("click");
    expect(wrapper.instance().state.showModal).toBe(true);
    expect(wrapper.instance().state.reservedId).toBe(1);
  });
  it("testing the closebutton", () => {
    let spy = jest.spyOn(wrapper.instance(), "showModal");

    const card = wrapper.find(".list");
    card.at(0).simulate("click");
    expect(wrapper.instance().state.showModal).toBe(true);

    wrapper.find(".close").simulate("click");
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.showModal).toBe(false);
  });

  it("testing the modal", () => {
    let spy = jest.spyOn(wrapper.instance(), "handleSubmit");
    const cards = wrapper.find(".list");
    window.alert = jest.fn();

    wrapper.instance().forceUpdate();

    cards.at(0).simulate("click");
    const text = wrapper.find(".text").text();
    expect(text).toEqual("You are booking table for Tomorrow");
    wrapper
      .find(".email")
      .simulate("change", { target: { value: "ram@gmail.com" } });
    wrapper
      .find(".phone")
      .simulate("change", { target: { value: 9999999999 } });

    wrapper.find(".btn").simulate("click", { preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      "Registration successful. We are waiting for your presence here."
    );
    let Expectingtext = wrapper.find(".card").map((child) => child.text());

    expect(Expectingtext).toEqual(
      [...Array(20)].map((a, i) => {
        if (i === 0) {
          return "Table Reserved";
        } else {
          return "";
        }
      })
    );
  });
});
