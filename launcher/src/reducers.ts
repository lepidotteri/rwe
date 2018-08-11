import { AppAction } from "./actions";
import { GetRoomsResponseRoomEntry } from "./web";

export interface GameListEntry {
  id: number;
  description: string;
  players: number;
  maxPlayers: number;
  host: string;
  port: number;
}

export interface OverviewScreen {
  screen: "overview";
  dialogOpen: boolean;
}

export interface HostFormScreen {
  screen: "host-form";
}

export interface GameRoomScreen {
  screen: "game-room";
  userMessage: string;
}
export type Screen =
  | HostFormScreen
  | OverviewScreen
  | GameRoomScreen;

export type PlayerSide = "ARM" | "CORE";
export type PlayerColor = number;

export interface PlayerInfo {
  id: number;
  name: string;
  side: PlayerSide;
  color: PlayerColor;
  team: number;
  ready: boolean;
}

export interface GameRoom {
  localPlayerId?: number;
  players: PlayerInfo[];
  messages: string[];
}

export interface State {
  games: GameListEntry[];
  selectedGameId?: number;
  currentScreen: Screen;
  isRweRunning: boolean;
  currentGame?: GameRoom;
}

export function isFull(game: GameListEntry): boolean {
  return game.players === game.maxPlayers;
}

export function canJoinSelectedGame(state: State): boolean {
  if (state.isRweRunning) {
    return false;
  }

  if (state.selectedGameId === undefined) {
    return false;
  }

  const game = state.games.find(g => g.id === state.selectedGameId);
  if (!game || isFull(game)) {
    return false;
  }

  return true;
}

export function canHostGame(state: State): boolean {
  return true;
}

export function canLaunchRwe(state: State): boolean {
  return !state.isRweRunning;
}

const initialState: State = {
  games: [],
  currentScreen: { screen: "overview", dialogOpen: false },
  isRweRunning: false,
};

function roomResponseEntryToGamesListEntry(room: GetRoomsResponseRoomEntry): GameListEntry {
  return {
    id: room.id,
    description: room.room.description,
    players: room.room.number_of_players,
    maxPlayers: room.room.max_players,
    host: room.room.host,
    port: room.room.port,
  };
}

function games(state: State = initialState, action: AppAction): State {
  switch (action.type) {
    case "SELECT_GAME":
      return { ...state, selectedGameId: action.gameId };
    case "JOIN_SELECTED_GAME": {
      if (state.currentScreen.screen !== "overview") { return state; }
      const newScreen = { ...state.currentScreen, dialogOpen: true };
      return { ...state, currentScreen: newScreen };
    }
    case "JOIN_SELECTED_GAME_CONFIRM": {
      const game: GameRoom = { players: [], messages: [] };
      return { ...state, currentScreen: { screen: "game-room", userMessage: "" }, currentGame: game }
    }
    case "JOIN_SELECTED_GAME_CANCEL": {
      if (state.currentScreen.screen !== "overview") { return state; }
      const newScreen = { ...state.currentScreen, dialogOpen: false };
      return { ...state, currentScreen: newScreen };
    }
    case "HOST_GAME":
      return { ...state, currentScreen: { screen: "host-form" } };
    case "HOST_GAME_FORM_CANCEL":
      return { ...state, currentScreen: { screen: "overview", dialogOpen: false } };
    case "HOST_GAME_FORM_CONFIRM": {
      const game: GameRoom = { players: [], messages: [] };
      return { ...state, currentScreen: { screen: "game-room", userMessage: "" }, currentGame: game };
    }
    case "LAUNCH_RWE_BEGIN":
      return { ...state, isRweRunning: true };
    case "LAUNCH_RWE_END":
      return { ...state, isRweRunning: false };
    case "RECEIVE_ROOMS": {
      const gamesList = action.rooms.rooms.map(roomResponseEntryToGamesListEntry);
      const selectedId =
        (state.selectedGameId && gamesList.find(x => x.id === state.selectedGameId))
        ? state.selectedGameId
        : undefined;
      return { ...state, games: gamesList, selectedGameId: selectedId };
    }
    case "RECEIVE_HANDSHAKE_RESPONSE": {
      if (!state.currentGame) { return state; }
      const newRoom = { ...state.currentGame, players: action.payload.players, localPlayerId: action.payload.playerId };
      return { ...state, currentGame: newRoom };
    }
    case "RECEIVE_PLAYER_JOINED": {
      if (!state.currentGame) { return state; }
      const newPlayers = state.currentGame.players.slice();
      const newPlayer: PlayerInfo = {
        id: action.payload.playerId,
        name: action.payload.name,
        side: "ARM",
        color: 0,
        team: 0,
        ready: false
      };
      newPlayers.push(newPlayer);
      const newRoom: GameRoom = { ...state.currentGame, players: newPlayers };
      return { ...state, currentGame: newRoom };
    }
    case "RECEIVE_PLAYER_LEFT": {
      if (!state.currentGame) { return state; }
      const newPlayers = state.currentGame.players.filter(x => x.id !== action.payload.playerId);
      const newRoom: GameRoom = { ...state.currentGame, players: newPlayers };
      return { ...state, currentGame: newRoom };
    }
    case "RECEIVE_CHAT_MESSAGE": {
      if (!state.currentGame) { return state; }
      const newMessages = state.currentGame.messages.slice();
      newMessages.push(action.message);
      const room: GameRoom = { ...state.currentGame, messages: newMessages };
      return { ...state, currentGame: room };
    }
    case "LEAVE_GAME":
    case "DISCONNECT_GAME":
      if (!state.currentGame) { return state; }
      return { ...state, currentScreen: { screen: "overview", dialogOpen: false }, currentGame: undefined}
    default:
      return state;
  }
}

export default games;
