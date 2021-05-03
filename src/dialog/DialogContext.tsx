import React, { useContext } from "react";
import { IDialogContext, IItem } from "../interfaces";


export const DialogContext = React.createContext<IDialogContext>({
  edit: {
    show: (item: IItem) => {},
    hide: () => {},
    item: null
  },
  create: {
    show: (item: IItem) => {},
    hide: () => {},
    item: null
  },
  del: {
    show: (item: IItem) => {},
    hide: () => {},
    item: null
  }
});

export const useDialogContext = () => {
  return useContext(DialogContext)
}