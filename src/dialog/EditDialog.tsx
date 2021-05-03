import React, { useState } from 'react'
import { useDialogContext } from './DialogContext'

export const EditDialog: React.FC<{ onEdit: Function, onValid: Function }> = (props) => {
  const { edit } = useDialogContext()
  const [errorName, setErrorName] = useState('')

  const editItem = () => {
    if (props.onValid({ id: edit.item?.id, parent_id: edit.item?.parent_id, name: edit.item?.name }) && edit.item?.name.length !== 0) {
      props.onEdit(edit.item)
      edit.hide()
    }
  }

  const chengeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    edit.show({ ...edit.item, name: event.target.value })
    if (props.onValid({ id: edit.item?.id, parent_id: edit.item?.parent_id, name: event.target.value }) && event.target.value.length !== 0) {
      setErrorName('')
    } else {
      setErrorName('Не допустимое имя дериктории!')
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      editItem()
    }
  }

  return (
    <>
      <div className={"dialog-box " + (edit.item ? 'show' : '')}>
        <div className="dialog-wrapper">
          <div className="dialog-head">Редактирование директории</div>
          <div className="dialog-body">
            <input type="text" value={edit.item?.name || ''} onChange={chengeName} onKeyDown={onKeyDown} />
            <span className="error">{errorName}</span>
          </div>
          <div className="dialog-foot">
            <button className="dialog-foot_btn green" disabled={errorName.length > 0} onClick={editItem}>Сохранить</button>
            <button className="dialog-foot_btn red" onClick={edit.hide}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  )
}