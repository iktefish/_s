/* Using React with TypeScript */

/*
    NOTE: Please read the entire files top to bottom, I couldn't breakdown the notes into multiple
    files.
*/

import React, {
    useCallback,
    useState,
    useEffect,
    useReducer,
    useRef,
} from "react";
import "./App.css";

//~~> Create a Heading component
const Heading = () => <h2>Heading</h2>;

//~~> Create a HeadingWithProps component, the `title` declared in `HeadingWithProps` is
//    called a Property or Prop. They are passed to the component -|
//                                  v------------------------------|
//                          ------------------
const HeadingWithProps = (props: { title: string }) => <h2>{props.title}</h2>;

//~~> It's often better to destructure the props -|
//                                        v-------|
const HeadingWithDestructuredProps = ({ title }: { title: string }) => (
    <h2>{title}</h2>
);

/*
    Let's create a `Box` container. It will insert its child nodes inside a <div>.
*/

//~~> Note the type of `children` -|
//                            v----|
//              -------------------------------------
const Box = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            style={{
                padding: "1rem",
                fontWeight: "bold",
            }}
        >
            {children}
        </div>
    );
};

interface AnotherBoxProps {
    children?: React.ReactNode;
}
// --------------------------------
//               ^---------------------------------------------------------------------|
//                                                                                     |
//~~> Rather than, annotating the `childred` parameter, we can annotate the component  |
//    itself.                                                                          |
//    We first need to create an interface --------------------------------------------|
//    Then we annotate the component with the interface -|
//                                  v--------------------|
//                 ------------------------------------
const AnotherBox: React.FunctionComponent<AnotherBoxProps> = ({ children }) => {
    /*
        NOTE: We will need to declare an interface for `AnotherBoxProps`.
    */
    return (
        <div
            style={{
                padding: "1rem",
                fontWeight: "bold",
            }}
        >
            {children}
        </div>
    );
};

/*
    Let's create a `List` component that will take an array and map over
    the array and return them as an un-ordered list.
*/
const List: React.FunctionComponent<{
    items: string[];
}> = ({ items }) => (
    <ul>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);

/*
    Let's add an onClick handler to our List. Say we want the component to
    run alter(item) on click.
*/
const ListOnClick: React.FunctionComponent<{
    items: string[];
    onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
    <ul>
        {items.map((item, index) => (
            <li key={index} onClick={() => onClick?.(item)}>
                {item}
            </li>
        ))}
    </ul>
);

/*
    We must define a Payload type.
*/
interface Payload {
    text: string;
}

/*
    We must define a Todo type.
*/
interface Todo {
    id: number;
    done: boolean;
    text: string;
}

/*
    We must define an Action type.
*/
type ActionType =
    | { type: "ADD"; text: string }
    | { type: "REMOVE"; id: number };

function App() {
    /*
        Create a click handler using useCallback() to handle onClick event.
    */
    const onListClick = useCallback((item: string) => {
        alert(item);
    }, []);

    /*
    Let's create a simple useStat() that overseens a boolean state.
    */
    //~~> The useState hook returns a tuple containing:
    //    - A function to change state -------|
    //    - The current state --------------| |
    //          v---------------------------| |
    //                          v-------------|
    const [checkedState, setCheckedState] = useState(true);

    /*
        Now let's look at a simple and common use-case. Say, you are downloading
        a payload from a server. In this case we want the parameter of useState()
        to be either a `Payload` type or `null`.

        Firstly we must define a payload type, this is done above.
    */
    //~~> We want our useState to take in either a Payload or a null -|
    //                                             v------------------|
    //                                      ------------
    const [payload, setPayload] = useState<Payload | null>(null);

    /*
        Now we want to use useEffect hook. It takes a function and a dependency array.
        If the dependency array is empty, then the useEffect will only execute the
        first time the component is loaded. This simulated a basic connection to a server.
    */
    useEffect(() => {
        fetch("/data.json")
            .then((resp) => resp.json())
            .then((data) => {
                setPayload(data);
            });
    }, []);

    /*
        The useReducer hook takes in 2 arguments. First is a reducer function (similar
        to array.reduce()), and second argument is the starting initial state.

        # Looking into the reduce function:
        This function will take an array of `Todo` (interface declared above), and an `ActionType`
        (type declared above) and is responsible for handling case of ActionType.type.
    */
    const [todos, dispatch] = useReducer(
        (state: Todo[], action: ActionType) => {
            switch (action.type) {
                case "ADD":
                    //~> Return a new state where the new item is appended to the current state.
                    return [
                        ...state,
                        {
                            id: state.length,
                            text: action.text,
                            done: false,
                        },
                    ];
                case "REMOVE":
                    //~> Return a new state where the `id` provided in dispatch is not present.
                    return state.filter(({ id }) => id !== action.id);
                default:
                    throw new Error();
            }
        },
        []
    );

    const newTodoRef = useRef<HTMLInputElement>(null);

    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            dispatch({
                type: "ADD",
                text: newTodoRef.current?.value,
            });
            newTodoRef.current.value = "";
        }
    }, []);

    /* Prop drilling useState hook */

    /*
        Let's create an incrementer component that will start at 0 and increment by 1 on click.
    */

    //~> This will be a simple state, starting off at 0.
    const [value, setValue] = useState(0);

    //~> The Incrementer function component.
    const Incrementer: React.FunctionComponent<{
        value: number;
        setValue: React.Dispatch<React.SetStateAction<number>>;
    }> = ({ value, setValue }) => (
        <button onClick={() => setValue(value + 1)}>Add - {value}</button>
    );

    /*
        Now let's try to create the same incrementer using a Custom hook.
    */

    const useNumber = (initialVal: number) => useState<number>(initialVal);
    type UseNumberValue = ReturnType<typeof useNumber>[0];
    type UseNumberSetValue = ReturnType<typeof useNumber>[1];
    const [newValue, newSetValue] = useNumber(0);

    //~> Another Incrementer function component that uses the newly created useNumber hook.
    const IncrementerWithCustomHook: React.FunctionComponent<{
        value: number;
        setValue: UseNumberSetValue;
    }> = ({ value, setValue }) => (
        <button onClick={() => setValue(value + 1)}>Add - {value}</button>
    );

    /* Detailed HTML props */
    /* 
        Assume you are on the UI design team of a company and you are tasked to make
        the standard button component that the rest of your ecosystem will use.
        
        Below, we have used this newly created Button component for adding todos.
    */

    const Button: React.FunctionComponent<
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
        //~~> The `children` will hold information of nodes that are under the button (usually text)
        //    and all other props will be passed as `...rest` (this ia a variadic parameter) -|
        //    v---------v---------------------------------------------------------------------|
    > = ({ children, ...rest }) => (
        <button
            {...rest}
            style={{
                color: "white",
                backgroundColor: "black",
                fontSize: "10",
            }}
        >
            {children}
        </button>
    );

    /*
        Continuing fron the above `Button`, say we want to have default styles but also want to be able
        to take styles as props that will override the defaults if needed.
    */
    const AnotherButton: React.FunctionComponent<
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
        //~~> Allow to accept style prop as a named variable -|
        //             v--------------------------------------|
    > = ({ children, style, ...rest }) => (
        <button
            {...rest}
            style={{
                color: "white",
                backgroundColor: "black",
                ...style, //~> Destructure style arg and extend on top of it.
            }}
        >
            {" "}
            {children}{" "}
        </button>
    );

    return (
        <div>
            <Heading />

            {/*/~~> Lets pass a title to this heading component -|*/}
            {/*                  v-------------------------------|*/}
            <HeadingWithProps title="Heading with propeties" />
            <HeadingWithDestructuredProps title="Heading with destructured properties" />
            <Box>Hello, I am a BOX container.</Box>
            <AnotherBox>Hello, I am a BOX container.</AnotherBox>
            <List items={["One", "Two", "Three"]} />
            <ListOnClick
                items={["One", "Two", "Three"]}
                onClick={onListClick}
            />
            <Box>{JSON.stringify(payload)}</Box>
            <HeadingWithProps title="Todos" />
            {todos.map((todo) => (
                <div key={todo.id}>
                    {todo.text}
                    {/*/~~> The following dispatch will be provided for pattern matching -|*/}
                    {/*           v-------------------------------------------------------|*/}
                    <button
                        onClick={() =>
                            dispatch({
                                type: "REMOVE",
                                id: todo.id,
                            })
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}
            <div>
                <input type="text" ref={newTodoRef} />
                {/*/~~> Instead of passing the function directly, we can use the useCallback hook -|*/}
                {/*                   v------------------------------------------------------------|*/}
                <button onClick={onAddTodo}>Add Todo</button>
            </div>
            <Incrementer value={value} setValue={setValue} />
            <IncrementerWithCustomHook
                value={newValue}
                setValue={newSetValue}
            />
            <div>
                {/*//~~> Use my custom Button component to add todos -|*/}
                {/*  v----------------------------------v-------------|*/}
                <Button onClick={onAddTodo}>Add Todo</Button>
                {/*//~~> Use my custom Button component to add todos -|*/}
                {/*  v----------------------------------v-------------|*/}
                <AnotherButton
                    onClick={onAddTodo}
                    style={{
                        color: "black",
                        backgroundColor: "orange",
                    }}
                >
                    Add Todo
                </AnotherButton>
            </div>
        </div>
    );
}

export default App;
