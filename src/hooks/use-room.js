import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import {
  SOCKET_SERVER_URL,
  NEW_VOTE_EVENT,
  REMOVE_VOTE_EVENT,
  REMOVE_VOTES_EVENT,
  REVEAL_VOTES_EVENT,
} from "../utils/constants";

const useRoom = (roomId) => {
  const [votes, setVotes] = useState([]);
  const [average, setAverage] = useState(0);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_VOTE_EVENT, (vote) => {
      const incomingVote = {
        ...vote,
        ownVote: vote.senderId === socketRef.current.id,
        isRevealed: false,
      };

      setVotes((previousVotes) => [...previousVotes, incomingVote]);
    });

    socketRef.current.on(REMOVE_VOTE_EVENT, (vote) => {
      setVotes((previousVotes) => {
        return previousVotes.filter(
          (previousVote) => previousVote.senderId !== vote.senderId
        );
      });
    });

    socketRef.current.on(REMOVE_VOTES_EVENT, () => {
      setVotes([]);
    });

    socketRef.current.on(REVEAL_VOTES_EVENT, (updatedAverage) => {
      setVotes((previousVotes) => {
        const updatedVotes = previousVotes.map((previousVote) => ({
          ...previousVote,
          isRevealed: true,
        }));

        return updatedVotes;
      });

      setAverage(updatedAverage);
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

  const removeAllVotes = () => {
    socketRef.current.emit(REMOVE_VOTES_EVENT);
    setAverage(0);
  };

  const revealVotes = () => {
    const sumOfVotes = votes.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    );
    const updatedAverage = sumOfVotes / votes.length;

    socketRef.current.emit(REVEAL_VOTES_EVENT, updatedAverage);
  };

  return {
    votes,
    average,
    sendVote,
    removeOwnVote,
    removeAllVotes,
    revealVotes,
  };
};

export default useRoom;
