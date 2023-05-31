import React from "react";
import "./Sidedrawer.css"

import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";

//write again

export default function Sidedrawer(props) {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={0}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside ref={props.ref} className="side-drawer" onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    );
    return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}
