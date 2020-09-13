export interface ITag {
  id: string
  name: string
  bgColor: string
  color: string
}

export interface ITagListTags {
  [id: string]: ITag
}

export interface ITagList {
  tags: ITagListTags,
}
