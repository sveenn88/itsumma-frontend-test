import React, { ReactNode } from "react";
import { IItem } from "../interfaces";
import {DialogContext} from './DialogContext'
enum ActionType {
  SHOW_E = 'showEdit',
  HIDE_E = 'hideEdit',
  SHOW_C = 'showCreate',
  HIDE_C = 'hideCreate',
  SHOW_D = 'showDelete',
  HIDE_D = 'hideDelete',
}

interface IStateDialog {
  isShowEdit: boolean;
  isShowCreate: boolean;
  isShowDelete: boolean;
  editItem: IItem|null;
  createItem: IItem|null;
  delItem: IItem|null;
}

interface IAction {
  type: ActionType;
  payload: IItem|null;
}

const initialState: IStateDialog = {
  isShowEdit: false,
  isShowCreate: false,
  isShowDelete: false,
  editItem: null,
  createItem: null,
  delItem: null,
};

const reducer: React.Reducer<IStateDialog, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.SHOW_E:
      return {...state, isShowEdit: true, editItem: action.payload};
    case ActionType.HIDE_E:
      return {...state, isShowEdit: false, editItem: null};
    case ActionType.SHOW_C:
      return {...state, isShowCreate: true, createItem: action.payload};
    case ActionType.HIDE_C:
      return {...state, isShowCreate: false, createItem: null};
    case ActionType.SHOW_D:
      return {...state, isShowDelete: true, delItem: action.payload};
    case ActionType.HIDE_D:
      return {...state, isShowDelete: false, delItem: null};
    default:
      return state
  }
}
    
        
export const DialogProvider: React.FC<{children: ReactNode, onEdit: Function, onCreate: Function, onDelete: Function}> = (props) => {
  
  const [state, dispatch] = React.useReducer<React.Reducer<IStateDialog, IAction>>(reducer, initialState);

  
  let edit = {
    show: (item: IItem) => dispatch({type: ActionType.SHOW_E, payload: item}),
    hide: () => dispatch({type: ActionType.HIDE_E, payload: null}),
    item: state.editItem
  }
  let create = {
    show: (item: IItem) => dispatch({type: ActionType.SHOW_C, payload: item}),
    hide: () => dispatch({type: ActionType.HIDE_C, payload: null}),
    item: state.createItem
  }
  let del = {
    show: (item: IItem) => {dispatch({type: ActionType.SHOW_D, payload: item})},
    hide: () => dispatch({type: ActionType.HIDE_D, payload: null}),
    item: state.delItem
  }

  return (      
    <DialogContext.Provider value={{edit, create, del}}>
      {props.children}
    </DialogContext.Provider>  
  )  
}