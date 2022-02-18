import Head from "next/head";
import { useState } from "react";
import Modal from "../components/modal";
import styles from "../../styles/Home.module.css";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cartes - planning poker</title>
        <meta
          name="description"
          content="An online planning poker application to help agile teams."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Cartes
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Online planning poker
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>
        </div>
      </div>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <div className="h-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-lg"
                >
                  Create room
                </button>
              </div>
              <Modal open={open} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
