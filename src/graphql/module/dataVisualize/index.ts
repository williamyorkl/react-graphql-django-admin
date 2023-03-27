import { gql } from "@apollo/client";

// 爬虫图片接口rawDataPinterestImg
export const GET_RAW_DATA_PINTEREST_IMG = gql`
	query ($createStart: DateTime!, $createEnd: DateTime!) {
		rawDataPinterestImg(createdAtStart: $createStart, createdAtEnd: $createEnd) {
			id
			imgDownloadLink
			productId
			createdAt
		}
	}
`;
// 渲染图片接口
export const GET_BLENDER_RENDER_PIC = gql`
	query ($createStart: DateTime!, $createEnd: DateTime!) {
		blenderPictures(createdAtStart: $createStart, createdAtEnd: $createEnd) {
			id
			imagePath
			isRetrieved
			createdAt
		}
	}
`;
// 发帖帖子接口
export const GET_SEND_POST_LOG = gql`
	query ($createStart: DateTime!, $createEnd: DateTime!) {
		pinterestLogs(createdAtStart: $createStart, createdAtEnd: $createEnd) {
			id
			pinAccountId
			pinterestSharedUrl
			createdAt
			blenderRenderPictures {
				imagePath
			}
			pinterestBotInfo {
				noxName
				pinterestBotBehaviour {
					savePin
					sendIdeaPin
					followPeople
					browsingPin
					sendIdeaPin
					sendProductPin
				}
			}
		}
	}
`;

export const GET_BOT_INFO = gql`
	query {
		pinterestBotInfo(isCurrentService: true) {
			id
			noxName
			noxNumber
			isCurrentService
			pinterestBotBehaviour {
				savePin
				sendIdeaPin
				followPeople
				browsingPin
				sendIdeaPin
				sendProductPin
			}
		}
	}
`;
