export const SOCKET_SERVER_URL = "/";
export const CONNECT_EVENT = "connection";
export const DISCONNECT_EVENT = "disconnect";
export const NEW_VOTE_EVENT = "new-vote-event";
export const REMOVE_VOTE_EVENT = "remove-vote-event";
export const REMOVE_VOTES_EVENT = "remove-votes-event";
export const REVEAL_VOTES_EVENT = "reveal-votes-event";

export const votingSystems = [
  {
    id: 0,
    name: "Fibonacci",
    values: ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "?"],
  },
];
