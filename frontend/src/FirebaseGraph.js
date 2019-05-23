import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart
} from "recharts";
import firebase from "./config/fbConfig";

class FirebaseGraph extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    firebase
      .database()
      .ref("database")
      .on("value", snapshot => {
        const val = snapshot.val()
        let arr = []
        Object.keys(val).map(value =>
          arr.push(val[value])
        );
        this.setState({data: arr})
      });
  }
  render() {
    const {data} = this.state
    
    return (
      <LineChart
        width={900}
        height={500}
        data={data}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#3CB371"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}

export default FirebaseGraph;
