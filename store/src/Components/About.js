import { useLocation } from "react-router-dom";

function About() {
    const data = useLocation()
    const item = data.state.item

    return (
        <div class="item" key={item.id}>
            <div class="container">
                <div class="name">{item.store}</div>
                <div>{item.description}</div>
            </div>
            <div class="container">
                <img class="image" src={item.extraImg} width="100" height="200" />
            </div>
        </div>
    );
}

export default About;
