import '../App.css';
import Item from "./Item"
import Banana from "../Images/Banana.webp";
import Orange from "../Images/Orange.jpg";
import Apple from "../Images/Apple.jpg";
import Grapes from "../Images/Grapes.jpg";
import Strawberry from "../Images/Strawberry.jpg";

function Items() {
    const items = [
        { id: 1, name: "Banana", img: Banana, price: "10" },
        { id: 2, name: "Apple", img: Apple, price: "5" },
        { id: 3, name: "Strawberry", img: Strawberry, price: "8" },
        { id: 4, name: "Orange", img: Orange, price: "12" },
        { id: 5, name: "Grapes", img: Grapes, price: "15" }
    ]

    return (
        <div className="App">
            {items.map(item => {
                return (
                    <Item item={item} />
                )
            })}
        </div>
    );
}

export default Items;
