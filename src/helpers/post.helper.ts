import { ApiResponse, LightPost, Post, TableData } from "../types/Post";
import moment from 'moment'

export function covertPostToLightPost(postResponse: ApiResponse): Array<LightPost> {
    return postResponse?.data?.children?.map((post: Post) => ({
        userName: post?.data?.author,
        date: convertTimestampToStr(post?.data?.created),
        title: post?.data?.title || "",
        description: post?.data?.selftext || "",
        score: `${post?.data?.score || 0}`,
        comments: `${post?.data?.num_comments || 0}`,
        shareUrl: post?.data?.url || ""
    } as LightPost))
}

export function convertTimestampToStr(timestamp: number): string {
    return moment.unix(timestamp).format('MMM D, YYYY');
}

export function convertLightPostToTableData(posts: Array<LightPost>): Array<TableData> {
    return posts.map((post: LightPost) => ({customData: post, date: ""} as TableData))
}