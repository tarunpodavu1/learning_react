import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import Footer from "../pages/footer"


Enzyme.configure({ adapter: new Adapter() });

describe("Nav component", () => {

  it('1 link component', () => {
    const component = shallow(<Footer />)
    const link = component.find(".link").at(0);
    expect(link.props().to).toContain("/education");
  })

  it('2 link component', () => {
    const component = shallow(<Footer />)
    const link = component.find(".link1").at(0);
    expect(link.props().to).toContain("/fiction");
  })

})

