import { useState } from 'react';
import { Menu } from './Menu';
import { SideNav, SideNavItem, Button, Icon, Preloader } from 'react-materialize';
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
      </SideNav>
      <div className='center-align'>
        {display}
      </div>
    </div>
  );
};