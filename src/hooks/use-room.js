import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_VOTE_EVENT = "newVoteEvent";
const REMOVE_VOTE_EVENT = "removeVoteEvent";
const SOCKET_SERVER_URL = `/`;

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

    socketRef.current.on(REMOVE_VOTE_EVENT, (vote) => {
      setVotes((previousVotes) => {
        return previousVotes.filter(
          (previousVote) => previousVote.senderId !== vote.senderId
        );
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendVote = (vote) => {
    socketRef.current.emit(NEW_VOTE_EVENT, {
      value: vote,
      senderId: socketRef.current.id,
    });
  };

  const removeOwnVote = () => {
    socketRef.current.emit(REMOVE_VOTE_EVENT, {
      senderId: socketRef.current.id,
    });
  };

  return { votes, sendVote, removeOwnVote };
};

export default useRoom;
