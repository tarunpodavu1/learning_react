import { render } from "@testing-library/react";
import App from "./App";
import React from 'react'

test('renders an h1', () => {
    const {getByText} = render(<App />)
    const h1 = getByText(/Hello React testing library/)
    expect(h1).toHaveTextContent('Hello React testing library')
})