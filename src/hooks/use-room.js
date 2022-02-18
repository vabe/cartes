import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_VOTE_EVENT = "newVoteEvent";
const SOCKET_SERVER_URL = `http://localhost:${parseInt(
  process.env.PORT || "4000",
  10
)}`;

const useRoom = (roomId) => {
  const [votes, setVotes] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_VOTE_EVENT, (vote) => {
      const incomingVotes = {
        ...vote,
        ownVote: vote.senderId === socketRef.current.id,
      };
      setVotes((previousVotes) => [...previousVotes, incomingVotes]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendVote = (vote) => {
    socketRef.current.emit(NEW_VOTE_EVENT, {
      body: vote,
      senderId: socketRef.current.id,
    });
  };

  return { votes, sendVote };
};

export default useRoom;
