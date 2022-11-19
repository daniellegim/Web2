import './App.css';
import Banana from "./Banana.webp";
import Orange from "./Orange.jpg";
import Apple from "./Apple.jpg";
import Grapes from "./Grapes.jpg";
import Strawberry from "./Strawberry.jpg";

function App() {
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
          <div class="item" key={item.id}>
            <div class="container">
              <div class="name">{item.name}</div>
              <div>{item.price}₪</div>
            </div>
            <div class="container">
              <img class="image" src={item.img} width="100" height="200" />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
