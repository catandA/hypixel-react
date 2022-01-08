import React from 'react';
import { Route, Switch } from "react-router-dom";
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import { MainApp } from './components/MainApp/MainApp';
import Startpage from './pages/Startpage/Startpage';
import PlayerDetails from './pages/PlayerDetails/PlayerDetails';
import ItemDetails from './pages/About/About';
import AuctionDetailsPage from './pages/AuctionDetails/AuctionDetails';
import Flipper from './pages/Flipper/Flipper';
import PremiumPage from './pages/Premium/Premium';
import About from './pages/About/About';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Feedback from './pages/Feedback/Feedback';
import Cancel from './pages/PaymentCancel/PaymentCancel';
import Success from './pages/PaymentSuccess/PaymentSuccess';
import Ref from './pages/Ref/Ref';
import Refed from './pages/Refed/Refed';
import ApiInfo from './pages/ApiInfo/ApiInfo';
import AuthMod from './pages/AuthMod/AuthMod';
import Crafts from './pages/Crafts/Crafts';
import LowSupply from './pages/LowSupply/LowSupply';
import NotFound from './pages/NotFound/NotFound';

const matomoTrackingInstance = createInstance({
  urlBase: 'https://track.coflnet.com',
  siteId: 1
});

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <MatomoProvider value={matomoTrackingInstance}>
    <MainApp>
      <Switch>
        <Route exact path="/" component={Startpage} />
        <Route path='/player/:uuid' component={PlayerDetails} />
        <Route path='/item/:tag' component={ItemDetails} />
        <Route path='/auction/:auctionUUID' component={AuctionDetailsPage} />
        <Route path='/flipper' component={Flipper} />
        <Route path='/premium' component={PremiumPage} />
        <Route path='/about' component={About} />
        <Route path='/subscriptions' component={Subscriptions} />
        <Route path='/feedback' component={Feedback} />
        <Route path='/cancel' component={Cancel} />
        <Route path='/success' component={Success} />
        <Route path='/ref' component={Ref} />
        <Route path='/refed' component={Refed} />
        <Route path='/data' component={ApiInfo} />
        <Route path='/authMod' component={AuthMod} />
        <Route path='/crafts' component={Crafts} />
        <Route path='/lowSupply' component={LowSupply} />
        <Route path='*' exact component={NotFound} />
      </Switch>
    </MainApp>
  </MatomoProvider>
);