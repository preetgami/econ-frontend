import React from "react";

import "./Mainheader.css";
export default function Mainheader(props) {
    return <header className="main-header">{props.children}</header>;
}
