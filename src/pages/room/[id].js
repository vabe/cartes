import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { votingSystems } from "../../utils/constants";
import useRoom from "../../hooks/use-room";
import Card from "../../components/card";

export default function Room() {
  const router = useRouter();
  const [roomId, setRoomId] = useState();
  const [roomName, setRoomName] = useState("");
  const [roomVotingType, setRoomVotingType] = useState();

  const { votes, sendVote } = useRoom(roomId ? roomId : "");

  useEffect(() => {
    setRoomVotingType(router.query.votingType);
    setRoomName(router.query.name);
    setRoomId(router.query.id);
  }, [router.query]);

  function handleCardClick(cardValue) {
    sendVote(cardValue);
  }

  if (!roomVotingType) return "Loading";

  return (
    <div className="flex flex-col h-full">
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Cartes
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {roomName}
            </p>
          </div>
        </div>
      </div>
      <div className="grow">
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-72">
              <div className="h-full flex items-center justify-center flex-wrap">
                {votes.map((vote) => (
                  <h1
                    key={uuidv4()}
                    className={`mx-3 text-lg font-bold border p-3 rounded-lg ${
                      vote.ownVote && "bg-indigo-400 text-white"
                    }`}
                  >
                    {vote.body}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cards flex flex-wrap gap-4 justify-center">
        {votingSystems
          .find((votingSystem) => votingSystem.name === roomVotingType)
          .values.map((value) => (
            <Card
              key={uuidv4()}
              value={value}
              onClick={() => handleCardClick(value)}
            />
          ))}
      </div>
    </div>
  );
}
