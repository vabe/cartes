import Head from "next/head";
import Modal from "../components/modal";
import useModal from "../hooks/use-modal";
import { useRef } from "react";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";
import { votingSystems } from "../utils/constants";

export default function Home() {
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const nameRef = useRef(null);
  const votingTypeRef = useRef(null);
  const { isOpen, toggleModal } = useModal();

  function handleSubmit() {
    toggleModal();
    router.push({
      pathname: "room/[id]",
      query: {
        id: uuidv4(),
        name: nameRef.current.value,
        votingType: votingTypeRef.current.value,
      },
    });
  }

  return (
    <div className="h-full w-full flex justify-center">
      <Head>
        <title>Cartes - planning poker</title>
        <meta
          name="description"
          content="An online planning poker application to help agile teams."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col px-4 h-full lg:max-w-5xl">
        <div className="py-12 bg-white">
          <div className="max-w-7xl">
            <div className="">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Cartes
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Online planning poker
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500">
                A consensus-based, gamified technique for estimating.
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500">
                Members of the group make estimates by playing numbered cards
                face-down to the table, instead of speaking them aloud. The
                cards are revealed, and the estimates are then discussed. This
                way, the group can avoid the cognitive bias of anchoring, where
                the first number spoken aloud sets a precedent for subsequent
                estimates.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl lg:px-8 flex-grow border-4 border-dashed border-gray-200 rounded-lg mb-10">
          <div className="h-full flex items-center justify-center">
            <button
              type="button"
              onClick={toggleModal}
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-lg"
            >
              Create room
            </button>
          </div>
          <Modal open={isOpen} toggleModal={toggleModal}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Create new room
                  </Dialog.Title>
                  <div className="w-full px-4 py-5 bg-white sm:p-6">
                    <label
                      htmlFor="room-name"
                      className="block text-sm text-left font-medium text-gray-700"
                    >
                      Room name
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      name="room-name"
                      id="room-name"
                      className="mt-1 mb-5  py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border border-gray-300 rounded-md"
                    />

                    <label
                      htmlFor="voting-system"
                      className="block text-sm text-left font-medium text-gray-700"
                    >
                      Voting-system
                    </label>
                    <select
                      ref={votingTypeRef}
                      id="voting-system"
                      name="voting-system"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    >
                      {votingSystems.map((item) => (
                        <option key={item.id} value={item.name}>{`${
                          item.name
                        } (${item.values.join(", ")})`}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                  disabled={nameRef.current?.value === 0}
                >
                  Create new room
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggleModal}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}
