import React from "react";
import axios from "axios";

export default class MaterialList extends React.Component {
  state = {
    material: []
  };

  componentDidMount() {
    axios.get("https://localhost:5001/getMaterials/Active").then(res => {
      const material = res.data;
      this.setState({ material });
    });
  }

  render() {
    return (
      <select>
        {this.state.material.map(material => <option>{material.materialName} - {material.amount}</option>)}
      </select>
    );
  }
}