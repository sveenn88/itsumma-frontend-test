import React, { ReactNode, useState } from "react";

const AlertContext = React.createContext(false);

export const AlertProvider: React.FC<{children: ReactNode}> = (props) => {

  const [dialog, setDialog] = useState(false)
  const toggle = () => setDialog(prev => prev=!prev)

  return (
    <AlertContext.Provider value={dialog}>
      {props.children}
    </AlertContext.Provider>
  )
}