import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incNum, decNum } from "./actions/index";

const App = () => {
    const myState = useSelector((state: any) => state.changeTheNumber);
    const dispatch = useDispatch();

    return (
        <>
            <div className="container">
                <h1>Increment/Decrement</h1>
                <h4>using React and Redux</h4>

                <div className="quantity">
                    <a
                        className="quantity__minus"
                        title="Decrement"
                        onClick={() => dispatch(incNum())}
                    >
                        <span>-</span>
                    </a>
                    <input
                        name="quantity"
                        type="text"
                        className="quantity__input"
                        value={myState}
                    />
                    <a
                        className="quantity__plus"
                        title="increment"
                        onClick={() => dispatch(decNum())}
                    >
                        <span>+</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default App;
