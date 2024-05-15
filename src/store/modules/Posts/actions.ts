import { State } from '../../state'
import { ActionContext } from 'vuex'
import { PostModuleState} from './state'
import { MutationsType } from './mutations'
import { covertPostToLightPost } from '../../../helpers/post.helper'

export enum ActionTypes {
  GET_POSTS_LIST = 'GET_POSTS_LIST',
}

export const PostAction = {
  async [ActionTypes.GET_POSTS_LIST](context: ActionContext<PostModuleState, State>, community: string, limit: number) {
    //context.commit(MainMutationsType.SET_CUSTOM_LOADER, true)

    const PostService = await import('../../../services/postsService')

    const postService = new PostService.default()

    const resp = await postService.getPosts(community, limit)

    console.log(resp)

    if (resp) {
      context.commit(MutationsType.SET_POST_LIST, [...covertPostToLightPost(resp)])
    }

    //context.commit(MainMutationsType.SET_CUSTOM_LOADER, false)
  },
  
}
