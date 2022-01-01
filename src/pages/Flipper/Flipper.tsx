import React, { useEffect } from 'react';
import './Flipper.css';
import FlipperComponent from '../../components/Flipper/Flipper';
import { Container } from 'react-bootstrap';
import Search from '../../components/Search/Search';
import { Helmet } from "react-helmet";

function Flipper() {

    return (
        <div className="flipper">
            <Container>
                <Search />
                <h2>
                    Item-Flipper (WIP)
                </h2>
                <hr />
                <FlipperComponent />
            </Container>
            <Helmet>
                <title>{`Auction flipper for hypixel skyblock`}</title>
                <meta property="og:title" content="Skyblock AH history auction flipper | Hypixel SkyBlock AH history" />
                <meta property="og:description" content={"Free auction house item flipper for Hypixel Skyblock"} />
                <meta property="keywords" content="flipper,hypixel,skyblock,auction,history,bazaar,tracker" />
            </Helmet>
        </div >
    );
}

export default Flipper;