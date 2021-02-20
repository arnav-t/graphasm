import '../styles/App.css';
import { asyncRun } from '../scripts/py-worker';

const script = `
import numpy as np
[i**2 for i in range(10)]
`;

export const App = () => {
  asyncRun(script, {data: ''})
    .then(res => console.log(res))
    .catch(err => console.log(err));

  
  return (
    <div className="App">
      <nav className="nav-wrapper red darken-4">
        Cool
      </nav>
    </div>
  );
};