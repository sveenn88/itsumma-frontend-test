import React, { useState } from 'react'
import { useDialogContext } from './DialogContext'

export const CreateDialog: React.FC<{ onCreate: Function, onValid: Function }> = (props) => {
  const { create } = useDialogContext()
  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState('')

  const createItem = () => {
    if (props.onValid({ id: 'new', parent_id: create.item?.id, name: name }) && name.length !== 0) {
      props.onCreate({ name: name, parent_id: create.item?.id })
      create.hide()
      setName('')
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItem()
    }
  }

  const chengeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    if (props.onValid({ id: 'new', parent_id: create.item?.id, name: event.target.value }) && event.target.value.length !== 0) {
      setErrorName('')
    } else {
      setErrorName('Не допустимое имя дериктории!')
    }
  }

  return (
    <>
      <div className={"dialog-box " + (create.item ? 'show' : '')}>
        <div className="dialog-wrapper">
          <div className="dialog-head">Новая директория</div>
          <div className="dialog-body">
            <input type="text" value={name} onChange={chengeName} onKeyDown={onKeyDown} />
            <span className="error">{errorName}</span>
          </div>
          <div className="dialog-foot">
            <button className="dialog-foot_btn green" disabled={errorName.length > 0} onClick={createItem}>Сохранить</button>
            <button className="dialog-foot_btn red" onClick={create.hide}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  )
}