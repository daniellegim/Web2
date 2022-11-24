import '../App.css';
import Item from "./Item"
import Banana from "../Images/Banana.webp";
import Banana2 from "../Images/Banana2.jpg";
import Orange from "../Images/Orange.jpg";
import Orange2 from "../Images/Orange2.jpg";
import Apple from "../Images/Apple.jpg";
import Apple2 from "../Images/Apple2.webp";
import Grapes from "../Images/Grapes.jpg";
import Grapes2 from "../Images/Grapes2.jpg";
import Strawberry from "../Images/Strawberry.jpg";
import Strawberry2 from "../Images/Strawberry2.webp";
import { Link } from "react-router-dom";

function Items() {
    const items = [
        { id: 1, name: "Banana", img: Banana, price: "10", store: "Shufersal", description: "Yellow banana", extraImg: Banana2 },
        { id: 2, name: "Apple", img: Apple, price: "5", store: "Yenot Bitan", description: "Red apple", extraImg: Apple2 },
        { id: 3, name: "Strawberry", img: Strawberry, price: "8", store: "Shufersal", description: "Yummy strawberry", extraImg: Strawberry2 },
        { id: 4, name: "Orange", img: Orange, price: "12", store: "Mega Bair", description: "Best orange", extraImg: Orange2 },
        { id: 5, name: "Grapes", img: Grapes, price: "15", store: "Shufersal", description: "Great grapes", extraImg: Grapes2 }
    ]

    return (
        <div className="App">
            {items.map(item => {
                return (
                    <Link to="/about" state={{ item }} style={{ textDecoration: "none", color: "black" }}>
                        <Item item={item} />
                    </Link>
                )
            })}
        </div>
    );
}

export default Items;
