import { useState } from 'react';
import { Menu } from './Menu';
import { SideNav, SideNavItem, Button, Icon, Preloader, CardPanel, Collapsible, CollapsibleItem } from 'react-materialize';
import '../styles/App.css';

export const App = () => {
  const [graph, setGraph] = useState(null);

  const trigger = <Button icon={<Icon>menu</Icon>} floating large className='black'/>;
  let display = <Preloader active size='big' color='red'/>;
  if (graph === '') display = <Icon large color='red'>clear</Icon>;
  else if (graph) display = <img className='graph' src={graph} alt='graph'/>;
  return (
    <div>
      <SideNav fixed trigger={trigger}>
        <SideNavItem
          href='#'
          user={{
            background: './graph-pattern.jpg',
            name: 'Graphasm'
          }}
          userView
        />
        <Menu setGraph={setGraph}/>
        <CardPanel>
          <h5>Examples</h5>
          <Collapsible accordion>
            <CollapsibleItem 
              expanded={false}
              header='Edge List'
              node='div'
            >
              <code>[[0,1],[1,2],[2,0]]</code>
            </CollapsibleItem>
            <CollapsibleItem 
              expanded={false}
              header='Weighted Edge List'
              node='div'
            >
              <code>[[0,1,10],[1,2,20],[2,0,30]]</code>
            </CollapsibleItem>
            <CollapsibleItem 
              expanded={false}
              header='Adjacency List'
              node='div'
            >
              <code>[[1],[2],[0]]</code>
            </CollapsibleItem>
            <CollapsibleItem 
              expanded={false}
              header='Adjacency Matrix'
              node='div'
            >
              <code>[[0,1,0],[0,0,1],[1,0,0]]</code>
            </CollapsibleItem>
          </Collapsible>
        </CardPanel>
      </SideNav>
      <div className='center-align'>
        {display}
      </div>
    </div>
  );
};