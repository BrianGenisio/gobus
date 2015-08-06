/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/http';
import App from './components/App';
import HomePage from './components/Home';
import RouteList from './components/RouteList';
import RouteDetails from './components/RouteDetails';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/', async () => <HomePage />);
  on('/routes', async () => <RouteList />);
  on('/routes/:id', async (state) => <RouteDetails id={state.params.id} />);
  on('/contact', async () => <ContactPage />);

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>);

});

export default router;
