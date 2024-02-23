import Head from "next/head";
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
  const confettiColors = ["#503291", "#2dbecd", "#eb3c96", "#ffc832"];

  const {
    votes,
    average,
    sendVote,
    removeOwnVote,
    removeAllVotes,
    revealVotes,
  } = useRoom(roomId ?? "");

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
  }

  function handleRevealAnswers() {
    revealVotes();
  }

  if (!roomVotingType) return "Loading";

  return (
    <>
      <Head>
        <title>Cartes - {roomName}</title>
        <meta
          name="description"
          content="An online planning poker application to help agile teams."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full flex justify-center">
        <div className="flex flex-col px-4 h-full lg:max-w-5xl">
          <div className="flex justify-between py-6 lg:py-12 bg-white w-full px-4 md:px-6 lg:px-8">
            <Button onClick={handleRestartRoom} light>
              <span className="flex items-center">
                <RefreshIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600"
                  aria-hidden="true"
                />
              </span>
              <span className="hidden md:block md:pl-2">Restart room</span>
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
              <span className="flex items-center">
                <EyeOffIcon
                  className={`h-5 w-5 ${
                    votes.length === 0 ? "text-indigo-500" : "text-white"
                  }`}
                  aria-hidden="true"
                />
              </span>
              <span className="hidden md:block md:pl-2">Reveal answers</span>
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

          {average !== 0 && votes.length !== 0 && (
            <Confetti
              numberOfPieces={300}
              recycle={false}
              width={window.innerWidth}
              height={window.innerHeight}
              colors={confettiColors}
            />
          )}

          <div className="grow md:grow-0 px-4 py-6 md:px-6 md:h-96">
            <div className="h-full  max-w-7xl lg:px-8 flex-grow border-4 border-dashed border-gray-200 rounded-lg mb-10">
              <div className="h-full flex items-center justify-center flex-wrap">
                {votes.map((vote) => (
                  <div
                    key={uuidv4()}
                    className={`mx-3 text-lg font-bold border p-3 rounded-lg ${
                      vote.ownVote && "bg-indigo-400 text-white"
                    }`}
                  >
                    {vote.isRevealed ? (
                      <span style={{ color: vote.value === "?" && "#EB3C96" }}>
                        {vote.value}
                      </span>
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

          <Transition
            show={votes.find((vote) => vote.ownVote) !== undefined}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-wrap justify-center mb-4">
              <Button onClick={handleRemoveVote}>
                <span className="flex items-center">
                  <TrashIcon
                    className="h-5 w-5 text-indigo-100 group-hover:text-indigo-50"
                    aria-hidden="true"
                  />
                </span>
                <span className="pl-2">Delete vote</span>
              </Button>
            </div>
          </Transition>

          <div className="cards flex flex-wrap gap-4 justify-center mb-6">
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
      </div>
    </>
  );
}
