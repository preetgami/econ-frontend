import React from "react";

import { useState } from "react";
import "./Miannavigation.css"
import Mainheader from "./Mainheader";

import Navlinks from "./Navlinks";
import Sidedrawer from "../components/Sidedrawer";
import Backdrop from "../components/Backdrop"

export default function Mainnavigation(props) {
    const [drawerIsOpen, setDrawerIsopen] = useState(false);

    const openDrawer = () => {
        setDrawerIsopen(true);
    };

    const closeDrawer = () => {
        setDrawerIsopen(false);
    };
    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

            <Sidedrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <Navlinks />
                </nav>
            </Sidedrawer>

            <Mainheader>
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-naviagtion__title">
                    ArtAlchemy
                </h1>

                <nav className="main-navigation__header-nav">
                    <Navlinks />
                </nav>
            </Mainheader>
        </React.Fragment>
    );
}
