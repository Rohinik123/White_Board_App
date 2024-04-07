import React from 'react'
import "./Index.css";
import CreateRoom from './CreateRoom/Index';
import JoinRoom from './JoinRoom/Index';

const Forms = ({uuid, socket, setUser}) => {
  return (
    <div className="row h-100 pt-5" >
        <div className="col-md-4 mt-5 form-box p-5 border border-primary border-2 rounded-2 mx-auto d-flex flex-column align-items-center">
            <h1 className='text-primary fw-bold'>Create Room</h1>
            <CreateRoom uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
        <div className="col-md-4 mt-5 form-box p-5 border border-primary border-2 rounded-2 mx-auto d-flex flex-column align-items-center">
            <h1 className='text-primary fw-bold'>Join Room</h1>
            <JoinRoom  uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
    </div>
  )
}

export default Forms;
