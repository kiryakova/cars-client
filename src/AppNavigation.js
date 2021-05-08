import './services/rest-app-service';

import React, {Suspense, useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

//import {CartContext} from './ContextWrapper';

const Home = React.lazy(() => import('./components/Home'));
const Cars = React.lazy(() => import('./components/Cars'));
const CarEdit = React.lazy(() => import('./components/CarEdit'));
const CarCreate = React.lazy(() => import('./components/CarCreate'));
const Brands = React.lazy(() => import('./components/Brands'));
const BrandEdit = React.lazy(() => import('./components/BrandEdit'));
const BrandCreate = React.lazy(() => import('./components/BrandCreate'));
const Models = React.lazy(() => import('./components/Models'));
const ModelEdit = React.lazy(() => import('./components/ModelEdit'));
const ModelCreate = React.lazy(() => import('./components/ModelCreate'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));

function AppNavigation() {
    
  return (
        <Suspense fallback={<div className="lazy-notification">Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/cars" exact component={Cars} />
            <Route path="/cars/edit/:id" exact component={CarEdit} />
            <Route path="/cars/create" exact component={CarCreate} />
            <Route path="/brands" exact component={Brands} />
            <Route path="/brands/edit/:id" exact component={BrandEdit} />
            <Route path="/brands/create" exact component={BrandCreate} />
            <Route path="/models" exact component={Models} />
            <Route path="/models/edit/:id" exact component={ModelEdit} />
            <Route path="/models/create" exact component={ModelCreate} />
        
            <Route path="/error" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
  );
}

/*<Route path="/cars/create" exact component={CarCreate} />*/

export default AppNavigation;
