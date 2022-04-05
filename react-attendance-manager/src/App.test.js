import React from "react";
import Enzyme from "enzyme";
import { shallow, mount } from "enzyme";
import Classroom from "./components/classroom";
import App from "./App";

describe("testing attendance sheet", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Classroom />)));

  it("testing the total students in classroom", () => {
    const children = wrapper.find("#students");
    expect(children).toHaveLength(20);
  });
  it("testing the title", () => {
    let title = wrapper.find(".title").map((child) => child.text());
    expect(title).toEqual(["Digital Attendance Sheet"]);
    let text = wrapper.find(".text").map((child) => child.text());
    expect(text).toEqual(["List of absentees"]);
  });
  it("testing app.js", () => {
    let component = shallow(<App />);
    expect(component.find("Classroom").length).toBe(1);
  });

  it("testing the button text", () => {
    let btn = wrapper.find(".list1").map((child) => child.text());
    expect(btn).toEqual(["Take Attendance"]);
  });
  it("testing the list", () => {
    let list = wrapper.find(".main").map((child) => child.text());
    expect(list).toEqual([
      "Roll 1Roll 2Roll 3Roll 4Roll 5Roll 6Roll 7Roll 8Roll 9Roll 10Roll 11Roll 12Roll 13Roll 14Roll 15Roll 16Roll 17Roll 18Roll 19Roll 20",
    ]);
  });
  it("testing the button clicks", () => {
    let btn = wrapper.find("#students");
    let spy = jest.spyOn(wrapper.instance(), "handleClick");
    let spy1 = jest.spyOn(wrapper.instance(), "handleAttendance");

    let absentees = wrapper.find(".absentees").map((child) => child.text());
    let button = wrapper.find(".list1");
    btn.at(0).simulate("click");
    expect(spy).toHaveBeenCalled();

    btn.at(19).simulate("click");
    expect(spy).toHaveBeenCalled();
    button.simulate("click");
    expect(wrapper.find(".absentees")).toHaveLength(18);
    let list = wrapper.find(".absenteesList").map((child) => child.text());
    expect(list).toEqual(["2345678910111213141516171819"]);
  });
  it("testing the button clicks", () => {
    let btn = wrapper.find("#students");
    let button = wrapper.find(".list1");
    for (let i = 0; i < 20; i++) {
      if (i === 1 || i === 9 || i === 10 || i === 13 || i === 17) {
        continue;
      }
      btn.at(i).simulate("click");
    }

    button.simulate("click");

    expect(wrapper.find(".absentees")).toHaveLength(5);
    let list = wrapper.find(".absenteesList").map((child) => child.text());
    expect(list).toEqual(["210111418"]);
  });
});
