const Person = (props) => {
  return React.createElement('div', {}, [
    React.createElement('h1', {}, props.name),
    React.createElement('p', {}, props.occupation),
  ]);
};

const App = () => {
  return React.createElement('div', {}, [
    React.createElement('h1', { className: 'title' }, 'React is Rendered'),
    React.createElement(Person, { name: 'Tarun', occupation: 'coder' }, null),
    React.createElement(
      Person,
      { name: 'Andrei', occupation: 'instructor' },
      null
    ),
    React.createElement(
      Person,
      { name: 'Yihua', occupation: 'instructor' },
      null
    ),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById('root'));
