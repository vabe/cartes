import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { Transition } from "@headlessui/react";
import {
  RefreshIcon,
  LockClosedIcon,
  EyeOffIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { votingSystems } from "../../utils/constants";
import useRoom from "../../hooks/use-room";
import Card from "../../components/card";
import Button from "../../components/button";
import Confetti from "react-confetti";

export default function Room() {
  const router = useRouter();
  const [roomId, setRoomId] = useState();
  const [roomName, setRoomName] = useState("");
  const [roomVotingType, setRoomVotingType] = useState();
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    votes,
    average,
    sendVote,
    removeOwnVote,
    removeAllVotes,
    revealVotes,
  } = useRoom(roomId ? roomId : "");

  useEffect(() => {
    setRoomVotingType(router.query.votingType);
    setRoomName(router.query.name);
    setRoomId(router.query.id);
  }, [router.query]);

  function handleCardClick(cardValue) {
    sendVote(cardValue);
  }

  function handleRemoveVote() {
    removeOwnVote();
  }

  function handleRestartRoom() {
    removeAllVotes();
    setShowConfetti(false);
  }

  function handleRevealAnswers() {
    revealVotes();
    setShowConfetti(true);
  }

  if (!roomVotingType) return "Loading";

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
        <Button onClick={handleRestartRoom} light>
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <RefreshIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600"
              aria-hidden="true"
            />
          </span>
          Restart room
        </Button>
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Cartes
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {roomName}
          </p>
        </div>
        <Button onClick={handleRevealAnswers} disabled={votes.length === 0}>
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <EyeOffIcon
              className={`h-5 w-5 ${
                votes.length === 0 ? "text-indigo-500" : "text-white"
              }`}
              aria-hidden="true"
            />
          </span>
          Reveal answers
        </Button>
      </div>

      <Transition
        show={average !== 0 && votes.length !== 0}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Average: {average}
        </div>
      </Transition>

      {showConfetti && (
        <Confetti
          numberOfPieces={300}
          recycle={false}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      <div className="grow">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-72">
              <div className="h-full flex items-center justify-center flex-wrap">
                {votes.map((vote) => (
                  <div
                    key={uuidv4()}
                    className={`mx-3 text-lg font-bold border p-3 rounded-lg ${
                      vote.ownVote && "bg-indigo-400 text-white"
                    }`}
                  >
                    {vote.isRevealed ? (
                      vote.value
                    ) : (
                      <LockClosedIcon
                        className={`h-5 w-5 ${vote.ownVote && "text-white"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {votes.find((vote) => vote.ownVote) !== undefined && (
        <div className="flex flex-wrap justify-center mb-4">
          <Button onClick={handleRemoveVote}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <TrashIcon
                className="h-5 w-5 text-indigo-100 group-hover:text-indigo-50"
                aria-hidden="true"
              />
            </span>
            Delete vote
          </Button>
        </div>
      )}
      <div className="cards flex flex-wrap gap-4 justify-center">
        {votingSystems
          .find((votingSystem) => votingSystem.name === roomVotingType)
          .values.map((value) =>
            votes.find((vote) => vote.ownVote) === undefined ? (
              <Card
                key={uuidv4()}
                value={value}
                onClick={() => handleCardClick(value)}
              />
            ) : (
              <Card key={uuidv4()} value={value} disabled />
            )
          )}
      </div>
    </div>
  );
}
