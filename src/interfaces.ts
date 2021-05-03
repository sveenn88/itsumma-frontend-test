/* export interface CreateDir {
  id: string,
  name: string,
  parent_id: string,
} */

export interface IItem {
  id: string,
  name: string,
  parent_id: string | null
}

export interface IItemProps {
  item: IItem,
  catalog: IItem[],
  onDeleteDir: Function,
  onCreateDir: Function,
}

export interface IDialogContext {
  edit: {
    show: any,
    hide: any,
    item: IItem|null
  },
  create: {
    show: any,
    hide: any,
    item: IItem|null
  },
  del: {
    show: any,
    hide: any,
    item: IItem|null
  }
}