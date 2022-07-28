import React from "react";
import LayoutCustom from "../components/LayoutCustom";
import MyCircles from '../components/CirclesComponents/MyCircles';
import OtherCircles from '../components/CirclesComponents/OtherCircles';
import CircleCreateForm from '../components/CirclesComponents/CircleCreateForm';


function Organizations() {
    return (
        <LayoutCustom>
            <MyCircles />
            <OtherCircles />
            <CircleCreateForm/>
        </LayoutCustom>
    );
}

export default Organizations;
