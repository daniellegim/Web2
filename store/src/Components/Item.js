import '../App.css';

function Item(props) {
    const item = props.item

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
    );
}

export default Item;
