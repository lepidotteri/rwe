import { GetMapInfoResponse } from "./bridge";
import { CreateGameResponsePayload, GameCreatedEventPayload, GameDeletedEventPayload, GameUpdatedEventPayload, GetGamesResponsePayload } from "./master/protocol";
import { PlayerSide } from "./state";
import * as protocol from "./ws/protocol";

export interface SelectGameAction {
  type: "SELECT_GAME";
  gameId: number;
}

export function selectGame(gameId: number): SelectGameAction {
  return {
    type: "SELECT_GAME",
    gameId,
  };
}

export interface JoinSelectedGameAction {
  type: "JOIN_SELECTED_GAME";
}

export function joinSelectedGame(): JoinSelectedGameAction {
  return {
    type: "JOIN_SELECTED_GAME",
  };
}

export interface JoinSelectedGameConfirmAction {
  type: "JOIN_SELECTED_GAME_CONFIRM";
  name: string;
}

export function joinSelectedGameConfirm(name: string): JoinSelectedGameConfirmAction {
  return {
    type: "JOIN_SELECTED_GAME_CONFIRM",
    name,
  };
}

export interface JoinSelectedGameCancelAction {
  type: "JOIN_SELECTED_GAME_CANCEL";
}

export function joinSelectedGameCancel(): JoinSelectedGameCancelAction {
  return {
    type: "JOIN_SELECTED_GAME_CANCEL",
  };
}

export interface HostGameAction {
  type: "HOST_GAME";
}

export function hostGame(): HostGameAction {
  return {
    type: "HOST_GAME",
  };
}

export interface HostGameFormCancelAction {
  type: "HOST_GAME_FORM_CANCEL";
}

export function hostGameFormCancel(): HostGameFormCancelAction {
  return {
    type: "HOST_GAME_FORM_CANCEL",
  };
}

export interface HostGameFormConfirmAction {
  type: "HOST_GAME_FORM_CONFIRM";
  playerName: string;
  gameDescription: string;
  players: number;
}

export function hostGameFormConfirm(playerName: string, gameDescription: string, players: number): HostGameFormConfirmAction {
  return {
    type: "HOST_GAME_FORM_CONFIRM",
    playerName,
    gameDescription,
    players,
  };
}

export interface LaunchRweAction {
  type: "LAUNCH_RWE";
}

export function launchRwe(): LaunchRweAction {
  return {
    type: "LAUNCH_RWE",
  };
}

export interface LaunchRweEndAction {
  type: "LAUNCH_RWE_END";
}

export function launchRweEnd(): LaunchRweEndAction {
  return {
    type: "LAUNCH_RWE_END",
  };
}

export interface MasterServerConnectAction {
  type: "MASTER_SERVER_CONNECT";
}

export function masterServerConnect(): MasterServerConnectAction {
  return {
    type: "MASTER_SERVER_CONNECT",
  };
}

export interface MasterServerDisconnectAction {
  type: "MASTER_SERVER_DISCONNECT";
}

export function masterServerDisconnect(): MasterServerDisconnectAction {
  return {
    type: "MASTER_SERVER_DISCONNECT",
  };
}

export interface ReceiveRoomsAction {
  type: "RECEIVE_ROOMS";
  rooms: GetGamesResponsePayload;
}

export function receiveRooms(rooms: GetGamesResponsePayload): ReceiveRoomsAction {
  return {
    type: "RECEIVE_ROOMS",
    rooms,
  };
}

export interface ReceiveCreateGameResponseAction {
  type: "RECEIVE_CREATE_GAME_RESPONSE";
  payload: CreateGameResponsePayload;
}

export function receiveCreateGameResponse(payload: CreateGameResponsePayload): ReceiveCreateGameResponseAction {
  return {
    type: "RECEIVE_CREATE_GAME_RESPONSE",
    payload,
  };
}

export interface ReceiveGameCreatedAction {
  type: "RECEIVE_GAME_CREATED";
  payload: GameCreatedEventPayload;
}

export function receiveGameCreated(payload: GameCreatedEventPayload): ReceiveGameCreatedAction {
  return {
    type: "RECEIVE_GAME_CREATED",
    payload,
  };
}

export interface ReceiveGameUpdatedAction {
  type: "RECEIVE_GAME_UPDATED";
  payload: GameUpdatedEventPayload;
}

export function receiveGameUpdated(payload: GameUpdatedEventPayload): ReceiveGameUpdatedAction {
  return {
    type: "RECEIVE_GAME_UPDATED",
    payload,
  };
}

export interface ReceiveGameDeletedAction {
  type: "RECEIVE_GAME_DELETED";
  payload: GameDeletedEventPayload;
}

export function receiveGameDeleted(payload: GameDeletedEventPayload): ReceiveGameDeletedAction {
  return {
    type: "RECEIVE_GAME_DELETED",
    payload,
  };
}

export interface ReceiveChatMessageAction {
  type: "RECEIVE_CHAT_MESSAGE";
  payload: protocol.PlayerChatMessagePayload;
}

export function receiveChatMessage(payload: protocol.PlayerChatMessagePayload): ReceiveChatMessageAction {
  return {
    type: "RECEIVE_CHAT_MESSAGE",
    payload,
  };
}

export interface SendChatMessageAction {
  type: "SEND_CHAT_MESSAGE";
  message: string;
}

export function sendChatMessage(message: string): SendChatMessageAction {
  return {
    type: "SEND_CHAT_MESSAGE",
    message,
  };
}

export interface ReceivePlayerJoinedAction {
  type: "RECEIVE_PLAYER_JOINED";
  payload: protocol.PlayerJoinedPayload;
}

export function receivePlayerJoined(payload: protocol.PlayerJoinedPayload): ReceivePlayerJoinedAction {
  return {
    type: "RECEIVE_PLAYER_JOINED",
    payload,
  };
}

export interface ReceivePlayerLeftAction {
  type: "RECEIVE_PLAYER_LEFT";
  payload: protocol.PlayerLeftPayload;
}

export function receivePlayerLeft(payload: protocol.PlayerLeftPayload): ReceivePlayerLeftAction {
  return {
    type: "RECEIVE_PLAYER_LEFT",
    payload,
  };
}

export interface ReceiveHandshakeResponseAction {
  type: "RECEIVE_HANDSHAKE_RESPONSE";
  payload: protocol.HandshakeResponsePayload;
}

export function receiveHandshakeResponse(payload: protocol.HandshakeResponsePayload): ReceiveHandshakeResponseAction {
  return {
    type: "RECEIVE_HANDSHAKE_RESPONSE",
    payload,
  };
}

export interface ReceivePlayerReadyAction {
  type: "RECEIVE_PLAYER_READY";
  payload: protocol.PlayerReadyPayload;
}

export function receivePlayerReady(payload: protocol.PlayerReadyPayload): ReceivePlayerReadyAction {
  return {
    type: "RECEIVE_PLAYER_READY",
    payload,
  };
}

export interface ReceivePlayerChangedSideAction {
  type: "RECEIVE_PLAYER_CHANGED_SIDE";
  payload: protocol.PlayerChangedSidePayload;
}

export function receivePlayerChangedSide(payload: protocol.PlayerChangedSidePayload): ReceivePlayerChangedSideAction {
  return {
    type: "RECEIVE_PLAYER_CHANGED_SIDE",
    payload,
  };
}

export interface ReceivePlayerChangedTeamAction {
  type: "RECEIVE_PLAYER_CHANGED_TEAM";
  payload: protocol.PlayerChangedTeamPayload;
}

export function receivePlayerChangedTeam(payload: protocol.PlayerChangedTeamPayload): ReceivePlayerChangedTeamAction {
  return {
    type: "RECEIVE_PLAYER_CHANGED_TEAM",
    payload,
  };
}

export interface ReceivePlayerChangedColorAction {
  type: "RECEIVE_PLAYER_CHANGED_COLOR";
  payload: protocol.PlayerChangedColorPayload;
}

export function receivePlayerChangedColor(payload: protocol.PlayerChangedColorPayload): ReceivePlayerChangedColorAction {
  return {
    type: "RECEIVE_PLAYER_CHANGED_COLOR",
    payload,
  };
}

export interface LeaveGameAction {
  type: "LEAVE_GAME";
}

export function leaveGame(): LeaveGameAction {
  return {
    type: "LEAVE_GAME",
  };
}

export interface DisconnectGameAction {
  type: "DISCONNECT_GAME";
}

export function disconnectGame(): DisconnectGameAction {
  return {
    type: "DISCONNECT_GAME",
  };
}

export interface OpenSlotAction {
  type: "OPEN_SLOT";
  slotId: number;
}

export function openSlot(slotId: number): OpenSlotAction {
  return {
    type: "OPEN_SLOT",
    slotId,
  };
}

export interface ReceiveSlotOpenedAction {
  type: "RECEIVE_SLOT_OPENED";
  payload: protocol.SlotOpenedPayload;
}

export function receiveSlotOpened(payload: protocol.SlotOpenedPayload): ReceiveSlotOpenedAction {
  return {
    type: "RECEIVE_SLOT_OPENED",
    payload,
  };
}

export interface ReceiveSlotClosedAction {
  type: "RECEIVE_SLOT_CLOSED";
  payload: protocol.SlotClosedPayload;
}

export function receiveSlotClosed(payload: protocol.SlotClosedPayload): ReceiveSlotClosedAction {
  return {
    type: "RECEIVE_SLOT_CLOSED",
    payload,
  };
}

export interface CloseSlotAction {
  type: "CLOSE_SLOT";
  slotId: number;
}

export function closeSlot(slotId: number): CloseSlotAction {
  return {
    type: "CLOSE_SLOT",
    slotId,
  };
}

export interface ToggleReadyAction {
  type: "TOGGLE_READY";
}

export function toggleReady(): ToggleReadyAction {
  return {
    type: "TOGGLE_READY",
  };
}

export interface ChangeSideAction {
  type: "CHANGE_SIDE";
  side: PlayerSide;
}

export function changeSide(side: PlayerSide): ChangeSideAction {
  return {
    type: "CHANGE_SIDE",
    side,
  };
}

export interface ChangeTeamAction {
  type: "CHANGE_TEAM";
  team?: number;
}

export function changeTeam(team?: number): ChangeTeamAction {
  return {
    type: "CHANGE_TEAM",
    team,
  };
}

export interface ChangeColorAction {
  type: "CHANGE_COLOR";
  color: number;
}

export function changeColor(color: number): ChangeColorAction {
  return {
    type: "CHANGE_COLOR",
    color,
  };
}

export interface StartGameAction {
  type: "START_GAME";
}

export function startGame(): StartGameAction {
  return {
    type: "START_GAME",
  };
}

export interface GameEndedAction {
  type: "GAME_ENDED";
}

export function gameEnded(): GameEndedAction {
  return {
    type: "GAME_ENDED",
  };
}

export interface SendStartGameAction {
  type: "SEND_START_GAME";
}

export function sendStartGame(): SendStartGameAction {
  return {
    type: "SEND_START_GAME",
  };
}

export interface ReceiveStartGameAction {
  type: "RECEIVE_START_GAME";
  payload: protocol.StartGamePayload;
}

export function receiveStartGame(payload: protocol.StartGamePayload): ReceiveStartGameAction {
  return {
    type: "RECEIVE_START_GAME",
    payload,
  };
}

export interface AddDataPathAction {
  type: "ADD_DATA_PATH";
  path: string;
}

export function addDataPath(path: string): AddDataPathAction {
  return {
    type: "ADD_DATA_PATH",
    path,
  };
}

export interface ClearDataPathsAction {
  type: "CLEAR_DATA_PATHS";
}

export function clearDataPaths(): ClearDataPathsAction {
  return {
    type: "CLEAR_DATA_PATHS",
  };
}

export interface GetMapInfoAction {
  type: "GET_MAP_INFO";
  map: string;
}

export function getMapInfo(map: string): GetMapInfoAction {
  return {
    type: "GET_MAP_INFO",
    map,
  };
}

export interface GetMapListAction {
  type: "GET_MAP_LIST";
}

export function getMapList(): GetMapListAction {
  return {
    type: "GET_MAP_LIST",
  };
}

export interface OpenSelectMapDialogAction {
  type: "OPEN_SELECT_MAP_DIALOG";
}

export function openSelectMapDialog(): OpenSelectMapDialogAction {
  return {
    type: "OPEN_SELECT_MAP_DIALOG",
  };
}

export interface CloseSelectMapDialogAction {
  type: "CLOSE_SELECT_MAP_DIALOG";
}

export function closeSelectMapDialog(): CloseSelectMapDialogAction {
  return {
    type: "CLOSE_SELECT_MAP_DIALOG",
  };
}

export interface ReceiveMapListAction {
  type: "RECEIVE_MAP_LIST";
  maps: string[];
}

export function receiveMapList(maps: string[]): ReceiveMapListAction {
  return {
    type: "RECEIVE_MAP_LIST",
    maps,
  };
}

export interface ChangeMapAction {
  type: "CHANGE_MAP";
}

export function changeMap(): ChangeMapAction {
  return {
    type: "CHANGE_MAP",
  };
}

export interface DialogSelectMapAction {
  type: "DIALOG_SELECT_MAP";
  mapName: string;
}

export function dialogSelectMap(mapName: string): DialogSelectMapAction {
  return {
    type: "DIALOG_SELECT_MAP",
    mapName,
  };
}

export interface ReceiveMapChangedAction {
  type: "RECEIVE_MAP_CHANGED";
  data: protocol.MapChangedPayload;
}

export function receiveMapChanged(data: protocol.MapChangedPayload): ReceiveMapChangedAction {
  return {
    type: "RECEIVE_MAP_CHANGED",
    data,
  };
}

export interface ReceiveMinimapAction {
  type: "RECEIVE_MINIMAP";
  path: string;
}

export function receiveMinimap(path: string): ReceiveMinimapAction {
  return {
    type: "RECEIVE_MINIMAP",
    path,
  };
}

export interface ReceiveMapInfoAction {
  type: "RECEIVE_MAP_INFO";
  info: GetMapInfoResponse;
}

export function receiveMapInfo(info: GetMapInfoResponse): ReceiveMapInfoAction {
  return {
    type: "RECEIVE_MAP_INFO",
    info,
  };
}

export type AppAction =
  | SelectGameAction
  | JoinSelectedGameAction
  | JoinSelectedGameConfirmAction
  | JoinSelectedGameCancelAction
  | HostGameAction
  | HostGameFormCancelAction
  | HostGameFormConfirmAction
  | LaunchRweAction
  | LaunchRweEndAction
  | ReceiveCreateGameResponseAction
  | MasterServerConnectAction
  | MasterServerDisconnectAction
  | ReceiveRoomsAction
  | ReceiveGameCreatedAction
  | ReceiveGameUpdatedAction
  | ReceiveGameDeletedAction
  | ReceiveHandshakeResponseAction
  | ReceivePlayerJoinedAction
  | ReceivePlayerLeftAction
  | ReceiveChatMessageAction
  | ReceivePlayerChangedSideAction
  | ReceivePlayerChangedTeamAction
  | ReceivePlayerChangedColorAction
  | ReceivePlayerReadyAction
  | ReceiveSlotOpenedAction
  | ReceiveSlotClosedAction
  | SendChatMessageAction
  | ChangeSideAction
  | ChangeTeamAction
  | ChangeColorAction
  | OpenSlotAction
  | CloseSlotAction
  | ToggleReadyAction
  | SendStartGameAction
  | ReceiveStartGameAction
  | LeaveGameAction
  | DisconnectGameAction
  | StartGameAction
  | GameEndedAction
  | AddDataPathAction
  | ClearDataPathsAction
  | GetMapListAction
  | GetMapInfoAction
  | OpenSelectMapDialogAction
  | CloseSelectMapDialogAction
  | ReceiveMapListAction
  | ChangeMapAction
  | ReceiveMapChangedAction
  | DialogSelectMapAction
  | ReceiveMinimapAction
  | ReceiveMapInfoAction;
