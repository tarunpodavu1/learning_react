import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  test("renders Hello world as a text", () => {
    //Arrange
    render(<Greeting />);

    //Act
    //nothing

    //Assert
    const helloWorldElement = screen.getByText("Hello World");
    expect(helloWorldElement).toBeInTheDocument();
  });

  //test for unchanged paragraph(element)
  test("renders Its good to see(un changed component i.e button is not clicked)", () => {
    render(<Greeting />);
    const unChangedElement = screen.getByText("Its good to see");
    expect(unChangedElement).toBeInTheDocument();
  });

  //test for the changed paragraph(element)
  test("renders It has changed(button got clicked)", () => {
    //Arrange
    render(<Greeting />);
    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    //Assert
    const changedElement = screen.getByText("It has changed");
    expect(changedElement).toBeInTheDocument();
  });

  //test when the button clicked and unchanged(button wasnt clicked was hidden)
  test("does not render Its good to see if the button was clicked", ()=>{
    render(<Greeting />);
    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    //Assert
    const changedElement = screen.queryByText("Its good to see");
    expect(changedElement).toBeNull()
  });
});
