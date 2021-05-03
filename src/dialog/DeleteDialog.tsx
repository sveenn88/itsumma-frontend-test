import React from 'react'
import { useDialogContext } from './DialogContext'

export const DeleteDialog: React.FC<{onDelete: Function}> = (props) => {
  const { del } = useDialogContext()

  const deleteDir = () => {
    props.onDelete(del.item)
  }
  return (
    <>
      <div className={"dialog-box " + (del.item ? 'show' : '')} onClick={del.hide}>
        <div className="dialog-wrapper">
          <div className="dialog-head">Удаление директории</div>
          <div className="dialog-body">
            Вы удаляете директорию. Все вложенные директории будут удалены. Продолжить?
            </div>
          <div className="dialog-foot">
            <button className="dialog-foot_btn green" onClick={deleteDir}>Да</button>
            <button className="dialog-foot_btn red" onClick={del.hide}>Нет</button>
          </div>
        </div>
      </div>
    </>
  )
}