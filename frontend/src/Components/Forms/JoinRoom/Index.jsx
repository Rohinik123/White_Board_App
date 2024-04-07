import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JoinRoom = ({socket,setUser,uuid}) => {

  const [roomId, setRoomId]=useState("");
  const [name,setName]=useState("");
  const navigate=useNavigate();

  const handleRoomJoin=(e)=>{
    e.preventDefault();

    const roomData={
      name,
      roomId,
      userId:uuid(),
      host:false,
      presenter:false,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  }

  return (
    <form className='form col-md-12 mt-5'>
   <div className="form-group ">
    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}className='form-control my-2'placeholder='Enter your name'/>
   </div>
   <div className="form-group ">

        <input type='text' className='form-control my-2'value={roomId} onChange={(e)=>setRoomId(e.target.value)} placeholder='Enter room code'/>
        
    

   </div>
   <button type="submit" className='mt-4 btn btn-primary btn-block form-control'onClick={handleRoomJoin} > Join Room</button>

   </form>
  )
}

export default JoinRoom
