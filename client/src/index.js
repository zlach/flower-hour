import * as serviceWorker from "./serviceWorker";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import $ from "jquery";

class Flower extends Component {
  pluckFlowerLocal = () => {
    const { pluckFlower } = this.props;
    var { _id } = this.props;
    pluckFlower(_id);
  };

  render() {
    return (
      <div className='flower'>
        <form className='petal-form'>
          <textarea className='text-box' maxLength='70' />
          <div className='middle'>
            <textarea className='text-box' maxLength='70' />
            <div className='pollen'>{this.props.name}</div>
            <textarea className='text-box' maxLength='70' />
          </div>
          <textarea className='text-box' maxLength='70' />
        </form>
        <div className='stem'>
          <button
            className='pick'
            type='button'
            onClick={this.pluckFlowerLocal}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

class Garden extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "",
      flowers: []
    };
  }

  componentDidMount = () => {
    $.get("http://localhost:5000/flower", res => {
      this.setState({
        flowers: res
      });
    });
  };

  captureChange = e => {
    let value = e.target.value;

    this.setState({
      current: value
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.plantFlower();
    }
  };

  plantFlower = () => {
    const { current } = this.state;
    let flowers = this.state.flowers;
    let flower = { name: current, petals: [] };
    if (current !== "") {
      $.post(
        "http://localhost:5000/flower",
        flower,
        res => {
          this.setState({
            current: "",
            flowers: flowers.concat([res])
          });
        },
        null
      );
      document.getElementById("flower-namer").value = "";
    }
  };

  pluckFlower = _id => {
    $.post("http://localhost:5000/pluck", { _id: _id }, res => {
      var flowersCopy = [...this.state.flowers];
      var index = -1;
      flowersCopy.forEach(function(item, i) {
        if (item._id === res._id) {
          index = i;
        }
      });
      if (index !== -1) {
        flowersCopy.splice(index, 1);
        this.setState({
          flowers: flowersCopy
        });
      }
    });
  };

  render() {
    return (
      <>
        <h1>Flower Hour</h1>
        <div id='flower-form'>
          <input
            id='flower-namer'
            name='flower'
            type='text'
            onChange={this.captureChange}
            maxLength='15'
            onKeyPress={this.handleKeyPress}
          />
          <button id='namer-button' type='button' onClick={this.plantFlower}>
            New Flower
          </button>
        </div>
        <h2>
          Roses are red, violets are blue, use these flowers to plan what you do
        </h2>
        <div id='flowers'>
          {this.state.flowers.map(flower => (
            <Flower
              key={flower._id}
              _id={flower._id}
              pluckFlower={this.pluckFlower}
              name={flower.name}
            />
          ))}
        </div>
      </>
    );
  }
}

// ===================== //

ReactDOM.render(<Garden />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
