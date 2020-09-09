import { api } from './api';
import { ITagList, ITagListTags } from '../model/ITagList';

export class TagApi {
  static syncTags(userId, tagList: ITagListTags) {
    return api.post('tag/sync', { userId, tagList });
  }
}
