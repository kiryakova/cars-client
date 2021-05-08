import './services/rest-app-service';

import React from 'react';

import ContextWrapper from './ContextWrapper';

import AppNavigation from './AppNavigation';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  
  return (
    <ContextWrapper>
      <Header />
      <AppNavigation />
      <Footer />
    </ContextWrapper>
  );
}

export default App;
