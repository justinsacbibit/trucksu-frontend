import { IndexRoute, Route } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import OptionalAuthenticatedContainer from '../containers/optional_authenticated';
import HomeIndexView from '../views/home';
import RegistrationsNew from '../views/registrations/new';
import SessionsNew from '../views/sessions/new';
import Actions from '../actions/sessions';
import UserShowView from '../views/user/show';
import BeatmapShowView from '../views/beatmap/show';
import VerifyEmailView from '../views/verify_email/index.js';
import RealtimeShowView from '../views/realtime/show';

export default function configRoutes(store) {
  const _optionalAuthenticated = (nextState, replace, callback) => {
    const { dispatch } = store;
    const { session } = store.getState();
    const { currentUser } = session;

    if (!currentUser && localStorage.getItem('trucksuAuthToken')) {
      dispatch(Actions.currentUser());
    }

    dispatch(Actions.connectToSocket());

    callback();
  };
  const _ensureNotAuthenticated = (nextState, replace, callback) => {
    if (localStorage.getItem('trucksuAuthToken')) {
      replace('/');
    }

    callback();
  };
  const _goToHome = (nextState, replace, callback) => {
    replace('/');

    callback();
  };
  const _redirectToShortBeatmapUrl = (nextState, replace, callback) => {
    replace(`/b/${nextState.params.beatmapId}`);
    callback();
  };
  const _redirectToShortUserUrl = (nextState, replace, callback) => {
    replace(`/u/${nextState.params.userId}`);
    callback();
  };

  return (
    <Route component={MainLayout}>

      <Route path='/' component={OptionalAuthenticatedContainer} onEnter={_optionalAuthenticated}>
        <IndexRoute component={HomeIndexView} />
        <Route path='/sign-up' component={RegistrationsNew} onEnter={_ensureNotAuthenticated} />
        <Route path='/sign-in' component={SessionsNew} onEnter={_ensureNotAuthenticated} />
        <Route path='/users/:userId' component={UserShowView} onEnter={_redirectToShortUserUrl} />
        <Route path='/u/:userId' component={UserShowView} />
        <Route path='/beatmaps/:beatmapId' component={BeatmapShowView} onEnter={_redirectToShortBeatmapUrl} />
        <Route path='/b/:beatmapId' component={BeatmapShowView} />
        <Route path='/verify-email' component={VerifyEmailView} />
        <Route path='/realtime' component={RealtimeShowView} />

        {/*
        <Route path='/boards/:id' component={BoardsShowView}>
          <Route path='cards/:id' component={CardsShowView}/>
        </Route>
        */}
      </Route>

      <Route path='*' component={null} onEnter={_goToHome} />
    </Route>
  );
}
