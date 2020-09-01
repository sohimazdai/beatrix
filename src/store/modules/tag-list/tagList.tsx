import { ITagList, ITag, ITagListTags } from "../../../model/ITagList";
import { i18nGet } from '../../../localisation/Translate';
import { randomizeBGandFontColor } from '../../../utils/RandomizeColor';

export enum TagListActionType {
    CHANGE = "TAG_LIST_CHANGE",
    ADD = 'TAG_LIST_ADD_TAG',
    REMOVE = 'TAG_LIST_REMOVE_TAG',
}

export type TagListActionTypes = (
    TagListChangeAction |
    TagListRemoveAction |
    TagListAddAction
);

export interface TagListChangeAction {
    type: TagListActionType.CHANGE,
    payload: ITagList
}

export interface TagListAddAction {
    type: TagListActionType.ADD,
    payload: ITag
}

export interface TagListRemoveAction {
    type: TagListActionType.REMOVE,
    payload: number
}

export function createChangeTagList(tagList: ITagList): TagListChangeAction {
    return {
        type: TagListActionType.CHANGE,
        payload: tagList
    }
}

export function createAddTag(tag: ITag): TagListAddAction {
    return {
        type: TagListActionType.ADD,
        payload: tag
    }
}

export function createRemoveTag(id: number): TagListRemoveAction {
    return {
        type: TagListActionType.REMOVE,
        payload: id
    }
}

export function tagListReducer(
    module: ITagList = {
        tags: {
            '1': {
                id: 1,
                name: i18nGet('before_meal'),
                ...randomizeBGandFontColor(),
            },
            '2': {
                id: 2,
                name: i18nGet('after_meal'),
                ...randomizeBGandFontColor(),
            }
        },
        nextId: 3,
    },
    action: TagListActionTypes
): ITagList {
    switch (action.type) {
        case TagListActionType.CHANGE:
            return {
                ...module,
                ...action.payload
            }
        case TagListActionType.ADD:
            const tagId = module.nextId;
            const tag: ITag = {
                ...action.payload,
                id: tagId,
            };

            const tags = {
                ...module.tags,
                [tag.id]: tag
            };

            return {
                ...module,
                tags,
                nextId: module.nextId + 1,
            }
        case TagListActionType.REMOVE:
            const newTags = { ...module.tags };
            delete newTags[action.payload];
            return {
                ...module,
                tags: newTags
            };

        default: return module;
    }
}
