import React from 'react';
import Form from './components/Form';
import MyWordCloud from './components/WordCloud'
const App = () => {
  return (
    <div>
      <Form />
      <MyWordCloud text="React is a JavaScript library for building user interfaces. React makes it easy to create interactive UIs." />

    </div>
  );
};

export default App;
