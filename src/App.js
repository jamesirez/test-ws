import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("https://ton-bot-api.com");

function App() {
  const [swapData, setSwapData] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("SWAP_COMPLETED", (data) => {
      setSwapData(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Clean up the effect
    return () => {
      socket.off("connect");
      socket.off("SWAP_COMPLETED");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {swapData && (
          <div>
            <h2>Swap Completed:</h2>
            <p>Type: {swapData.type}</p>
            <p>UserId: {swapData?.userId}</p>
            <p>TelegramId: {swapData?.telegramId}</p>
            <p>Token In: {swapData.tokenIn}</p>
            <p>Amount In: {swapData.amountIn}</p>
            <p>Token Out: {swapData.tokenOut}</p>
            <p>Amount Out: {swapData.amountOut}</p>
            <p>Transaction Hash: {swapData.hash}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
