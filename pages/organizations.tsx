import React from "react";
import LayoutCustom from "../components/LayoutCustom";
import MyCircles from '../components/CirclesComponents/MyCircles';
import OtherCircles from '../components/CirclesComponents/OtherCircles';


function Organizations() {
    return (
        <LayoutCustom>
            <MyCircles />
            <OtherCircles />
        </LayoutCustom>
    );
}

export default Organizations;
