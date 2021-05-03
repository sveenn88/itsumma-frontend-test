import React, { useState } from "react";
import { IItem, IItemProps } from "./interfaces";
import { useDialogContext } from "./dialog/DialogContext";

export const ItemComponent: React.FC<IItemProps> = (props) => {
  const { edit, create, del } = useDialogContext()
  const childs: IItem[] = props.catalog.filter(x => x.parent_id === props.item.id)
  const isParent = childs.length > 0

  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }

  const createItem = (event: any, item: IItem) => {
    event.stopPropagation()
    create.show(item)
  }
  const editItem = (event: any, item: IItem) => {
    event.stopPropagation()
    edit.show(item)
  }
  const deleteItem = (event: any, item: IItem) => {
    event.stopPropagation()
    del.show(item)
  }
  return (
    <>
      <div className={"catalog-box " + (props.item.parent_id === null || props.item.parent_id === 'null' ? 'root' : '')}>
        <div className="catalog-box_item">
          <div
            className={
              'catalog-box_item-title ' + 
              (isParent ? 'parent ' : '') + 
              (show ? 'show ' : '') + 
              (edit.item?.id === props.item.id ? 'active ' : '') +
              (create.item?.id === props.item.id ? 'active ' : '') +
              (del.item?.id === props.item.id ? 'active ' : '')
            }
            onClick={toggleShow}
          >
            {props.item.name}
            <div className="actions">
              <div className="actions_edit" onClick={(e) => editItem(e, props.item)}>edit</div>
              <div className="actions_add" onClick={(e) => createItem(e, props.item)}>add</div>
              {(() => {
                  if(props.item.parent_id !== null && props.item.parent_id !== 'null') {
                    return <div className="actions_delete" onClick={(e) => deleteItem(e, props.item)}>del</div>
                  }
                }
              )()}
            </div>
          </div>
          {childs.map((item, i) => <ItemComponent item={item} catalog={props.catalog} onDeleteDir={props.onDeleteDir} onCreateDir={props.onCreateDir} key={item.id} />)}

        </div>
      </div>
    </>
  )
}