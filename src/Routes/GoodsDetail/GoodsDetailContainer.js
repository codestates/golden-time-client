import React from "react";
import GoodsDetailPresenter from "./GoodsDetailPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    console.log(this.props.location);
    return (<span>a</span>);
  }
}