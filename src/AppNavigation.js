import './services/rest-app-service';

import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

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
const Owners = React.lazy(() => import('./components/Owners'));
const OwnerEdit = React.lazy(() => import('./components/OwnerEdit'));
const OwnerCreate = React.lazy(() => import('./components/OwnerCreate'));
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
            <Route path="/owners" exact component={Owners} />
            <Route path="/owners/edit/:id" exact component={OwnerEdit} />
            <Route path="/owners/create" exact component={OwnerCreate} />
        
            <Route path="/error" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
  );
}

export default AppNavigation;