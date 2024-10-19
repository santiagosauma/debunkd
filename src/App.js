import React from 'react';
import Form from './components/Form';
import MyWordCloud from './components/WordCloud'
import PDFDropper from './components/PDFDropper';
const App = () => {
  return (
    <div>
      <Form />
      <MyWordCloud text="React is a JavaScript library for building user interfaces. React makes it easy to create interactive UIs." />
      <header className="App-header">
                <input type="file" accept="application/pdf"/>
      </header>
      <PDFDropper/>
    </div>
  );
};

export default App;
