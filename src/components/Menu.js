import { useState, useEffect } from "react";
import { Checkbox, RadioGroup, CardPanel, Textarea, Button, Icon } from 'react-materialize';
import { asyncRun } from '../scripts/py-worker';
import { script } from '../scripts/networkx';

export const Menu = ({ setGraph }) => {
  const [directed, setDirected] = useState(false);
  const [format, setFormat] = useState('Edge List');
  const [input, setInput] = useState('[[0,1],[1,2],[2,0]]');
  const [error, setError] = useState(false);

  const draw = async () => {
    try {
      const obj = JSON.parse(input.replace(/'/g, '"'));
      if (!Array.isArray(obj)) throw new Error('Not an array!');
    } catch {
      setError(true);
      return;
    }
    setGraph(null);
    const {results, error} = await asyncRun(script(directed, format, input), {});
    if (error) {
      setGraph('');
      setError(true);
    } else {
      setGraph(results);
      setError(false);
    }
  };

  useEffect(() => draw(), []);

  useEffect(() => {
    setError(false);
  }, [input]);

  return (
    <CardPanel>
      <p>
        <Checkbox 
          label='Directed' 
          checked={directed}
          onChange={({target}) => setDirected(target.checked)}
        />
      </p>
      <p>
        <RadioGroup
          row
          label='Input Format'
          name='format'
          options={[
            {
              label: 'Edge List',
              value: 'Edge List'
            },
            {
              label: 'Adjacency List',
              value: 'Adjacency List'
            },
            {
              label: 'Adjacency Matrix',
              value: 'Adjacency Matrix'
            }
          ]}
          value={format}
          onChange={({target}) => setFormat(target.value)}
          radioClassNames='row'
        />
      </p>
      <Textarea 
        value={input}
        onChange={({target}) => setInput(target.value)}
        label={format}
        className={error ? 'invalid' : ''}
        error='Invalid input'
      />
      <Button
        node='button'
        type='submit'
        waves='light'
        onClick={draw}
      >
        Draw
        <Icon right>
          device_hub
        </Icon>
      </Button>
    </CardPanel>
  );
};