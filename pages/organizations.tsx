import React from "react";
import LayoutCustom from "../components/LayoutCustom";
import MyCircles from '../components/CirclesComponents/MyCircles';
import OtherCircles from '../components/CirclesComponents/OtherCircles';
import CirclrCreateForm from '../components/CirclesComponents/CirclrCreateForm';


function Organizations() {
    return (
        <LayoutCustom>
            <MyCircles />
            <OtherCircles />
            <CirclrCreateForm/>
        </LayoutCustom>
    );
}

export default Organizations;
