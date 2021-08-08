import React from 'react';
import { Switch, Redirect, Route, RouteProps } from 'react-router-dom';

import MainLayout, { MainLayoutProps } from './layouts/mainLayout';

interface RouteWithLayoutProps {
  layout: React.FC<MainLayoutProps>;
  component: React.FC<RouteProps>;
  path: string;
  exact: boolean;
}

const RouteWithLayout = ({
  layout: Layout,
  component: Component,
  ...rest
}: RouteWithLayoutProps) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Layout>
          <Component {...routeProps} />
        </Layout>
      )}
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
