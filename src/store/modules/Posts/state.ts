import { LightPost } from "../../../types/Post"


export interface PostModuleState {
  postsList: Array<LightPost>
}

export const PostState: PostModuleState = {
  postsList: [],
}
