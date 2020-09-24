import { ITagList, ITag, ITagListTags } from "../../../model/ITagList";
import { i18nGet } from '../../../localisation/Translate';
import { randomizeBGandFontColor } from '../../../utils/RandomizeColor';
import { v1 as uuidv1 } from 'uuid';

export enum TagListActionType {
    CHANGE = "TAG_LIST_CHANGE",
    ADD = 'TAG_LIST_ADD_TAG',
    REMOVE = 'TAG_LIST_REMOVE_TAG',
    REPLACE = 'TAG_LIST_REPLACE',
    MERGE_TAGS = 'TAG_LIST_MERGE_TAGS',
}

export type TagListActionTypes = (
    TagListChangeAction |
    TagListRemoveAction |
    TagListAddAction |
    TagListReplaceAction |
    TagListMergeTagsAction
);

export interface TagListChangeAction {
    type: TagListActionType.CHANGE,
    payload: Partial<ITagList>
}

export interface TagListAddAction {
    type: TagListActionType.ADD,
    payload: ITag
}

export interface TagListRemoveAction {
    type: TagListActionType.REMOVE,
    payload: string
}

export interface TagListReplaceAction {
    type: TagListActionType.REPLACE,
    payload: ITagList
}

export interface TagListMergeTagsAction {
    type: TagListActionType.MERGE_TAGS,
    payload: ITagListTags
}

export function createChangeTagList(tagList: Partial<ITagList>): TagListChangeAction {
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

export function createRemoveTag(id: string): TagListRemoveAction {
    return {
        type: TagListActionType.REMOVE,
        payload: id
    }
}

export function createReplaceTagList(tagList: ITagList): TagListReplaceAction {
    return {
        type: TagListActionType.REPLACE,
        payload: tagList
    }
}

export function createMergeTags(tags: ITagListTags): TagListMergeTagsAction {
    return {
        type: TagListActionType.MERGE_TAGS,
        payload: tags
    }
}

const ids = {
    1: uuidv1(),
    2: uuidv1(),
    3: uuidv1(),
    4: uuidv1()
}

const defaultTags = () => ({
    [ids[1]]: {
        id: ids[1],
        name: i18nGet('before_meal'),
        ...randomizeBGandFontColor(),
    },
    [ids[2]]: {
        id: ids[2],
        name: i18nGet('after_meal'),
        ...randomizeBGandFontColor(),
    },
    [ids[3]]: {
        id: ids[3],
        name: i18nGet('fasting'),
        ...randomizeBGandFontColor(),
    },
    [ids[4]]: {
        id: ids[4],
        name: i18nGet('before_bedtime'),
        ...randomizeBGandFontColor(),
    },
});

export function tagListReducer(
    module: ITagList = { tags: defaultTags(), },
    action: TagListActionTypes
): ITagList {
    Object.keys(module.tags).forEach((tagKey) => {
        if (tagKey !== String(module.tags[tagKey].id)) {
            module.tags[tagKey].id = tagKey;
        }
    });

    switch (action.type) {
        case TagListActionType.CHANGE:
            return {
                ...module,
                ...action.payload
            }
        case TagListActionType.ADD:
            const newId = uuidv1();

            return {
                ...module,
                tags: {
                    ...module.tags,
                    [newId]: {
                        ...action.payload,
                        id: newId,
                    },
                },
            }
        case TagListActionType.REMOVE:
            const newTags = { ...module.tags };
            delete newTags[action.payload];
            return {
                ...module,
                tags: newTags
            };
        case TagListActionType.REPLACE:
            return action.payload;
        case TagListActionType.MERGE_TAGS:
            return {
                ...module,
                tags: {
                    ...module.tags,
                    ...action.payload
                },
            };
        default: return module;
    }
}
