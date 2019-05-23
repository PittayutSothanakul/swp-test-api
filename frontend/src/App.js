import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart
} from "recharts";
import FirebaseGraph from "./FirebaseGraph";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: [],
      endpoint: "https://test-swp-api.appspot.com/"
    };
  }

  componentDidMount = () => {
    const { endpoint, message } = this.state;
    const temp = message;
    const socket = socketIOClient(endpoint);
    socket.on("new-message", messageNew => {
      temp.push(messageNew);
      this.setState({ message: [...this.state.message, messageNew] });
    });
  };

  render() {
    const { message } = this.state;
    console.log(message);

    return (
      <div>
        <h2>Realtime</h2>
        <LineChart
          width={900}
          height={500}
          data={message || [{time: 'a', count: 3}, {time: 'b', count: 5}]}
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
        <h2>Firebase</h2>
        <FirebaseGraph />
      </div>
    );
  }
}

export default App;