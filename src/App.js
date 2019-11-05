import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Tabs from './tabs/tabs';
import './App.css';

const App = () => (
  <div className="wrapper">
    <Router>
      <Tabs
        items={[
          {
            name: 'Tab #1',
            route: 'id1',
            render: () => (
              <p>
                Depths burying snare value law merciful value snare society eternal-return decieve aversion.
                Holiest virtues pious war depths noble inexpedient against endless ultimate. Merciful
                disgust convictions grandeur abstract battle gains revaluation fearful inexpedient right
                holiest faithful battle. Merciful depths decrepit intentions virtues salvation war ultimate.
                Sea transvaluation virtues suicide battle against victorious.
              </p>
            )
          },
          {
            name: 'Tab #2',
            route: 'id2',
            render: () => (
              <p>
                Ideal overcome free burying grandeur aversion. Dead morality self right superiority passion
                virtues hope society play of snare grandeur. Good oneself burying law good ultimate burying.
                Play justice snare holiest noble sea reason marvelous right.
              </p>
            )
          },
          {
            name: 'Tab #3',
            route: 'id3',
            render: () => (
              <p>
                Inexpedient gains prejudice aversion pious snare noble ocean ocean overcome self ubermensch
                prejudice philosophy. Ocean strong sea burying reason ultimate burying spirit. Pious christianity
                decieve endless abstract decrepit abstract. Ocean burying depths evil horror suicide mountains
                fearful depths christianity disgust gains horror. Self marvelous passion faith against grandeur.
              </p>
            )
          }
        ]}
      />
    </Router>
  </div>
);

export default App;
