import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GiftedChat} from 'react-native-gifted-chat';

export type RoomMessage = {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
  };
};

export type RoomType = {
  roomId: string;
  createdAt?: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  messages: RoomMessage[];
};

export type MessageUpdateType = {
  roomId: string;
  messages: RoomMessage[];
  updatedAt: string;
  lastMessage: string;
};

type ChatState = {
  rooms: RoomType[] | any[];
  activeRoom: RoomType | undefined;
};

const initialState: ChatState = {
  rooms: [],
  activeRoom: undefined,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<RoomType>) => {
      state.rooms.push(action.payload);
    },
    updateMessages: (state, action: PayloadAction<MessageUpdateType>) => {
      state.rooms = state.rooms.map(room => {
        if (room.roomId === action.payload.roomId) {
          return {
            ...room,
            lastMessage: action.payload.lastMessage,
            updatedAt: action.payload.updatedAt,
            messages: GiftedChat.append(room.messages, action.payload.messages),
          };
        } else {
          return room;
        }
      });
    },
    setActiveRoom: (state, action: PayloadAction<string>) => {
      const roomId = `${action.payload}**admin`;
      state.activeRoom = state.rooms.find(room => room.roomId === roomId);
    },
    removeActiveRoom: state => {
      state.activeRoom = undefined;
    },
  },
});

export const {addRoom, updateMessages, setActiveRoom, removeActiveRoom} =
  chatsSlice.actions;
export default chatsSlice.reducer;
