import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import Nav from "../pages/nav"


Enzyme.configure({ adapter: new Adapter() });

describe("Nav component", () => {

  it('1 link component', () => {
    const component = shallow(<Nav />)
    const link = component.find(".text").at(0);
    expect(link.props().to).toContain("/");
  })

})

