import { Fragment, useRef } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";
import { votingSystems } from "../utils/constants";

export default function Modal({ open, setOpen }) {
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const nameRef = useRef(null);
  const votingTypeRef = useRef(null);

  function handleSubmit() {
    setOpen(false);
    router.push({
      pathname: `room/[id]`,
      query: {
        id: uuidv4(),
        name: nameRef.current.value,
        votingType: votingTypeRef.current.value,
      },
    });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
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
                >
                  Create new room
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
