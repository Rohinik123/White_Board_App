import { Route, Routes } from "react-router-dom";
import "./App.css";
import Forms from "./Components/Forms/Index";
import RoomPage from "./Pages/Room/Index";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const server = "http://localhost:8000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("User is successfully joined");
      } else {
        console.log("UserJoined error");
      }
    });
  }, []);

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route path="/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
