import { useQuery } from "@apollo/client";

import { GET_RAW_DATA_PINTEREST_IMG, GET_BLENDER_RENDER_PIC, GET_SEND_POST_LOG } from "@/graphql/module/dataVisualize";

export function useGeneralData(dateRangeArray: any) {
	const [createStart, createEnd] = dateRangeArray;

	const { data: rawDataPinImg } = useQuery(GET_RAW_DATA_PINTEREST_IMG, {
		variables: { createStart, createEnd },
		notifyOnNetworkStatusChange: true
	});

	const { data: blenderRenderPic } = useQuery(GET_BLENDER_RENDER_PIC, {
		variables: { createStart, createEnd },
		notifyOnNetworkStatusChange: true
	});

	const { data: sendPostLog } = useQuery(GET_SEND_POST_LOG, {
		variables: { createStart, createEnd },
		notifyOnNetworkStatusChange: true
	});

	return {
		rawDataPinImg,
		blenderRenderPic,
		sendPostLog
	};
}
