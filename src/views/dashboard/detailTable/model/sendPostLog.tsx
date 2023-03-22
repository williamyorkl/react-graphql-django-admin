import dayjs from "dayjs";
import { Image } from "antd";
import type { ColumnsType } from "antd/es/table";
const columns: ColumnsType<any> = [
	{
		title: "序号",
		render: (text, record, index) => `${index + 1}`
	},
	{
		title: "ID",
		dataIndex: "id",
		key: "id"
	},
	{
		title: "pinterest分享链接",
		dataIndex: "pinterestSharedUrl",
		key: "pinterestSharedUrl",
		render: (text: any) => (
			<a href={text} target="_blank" rel="noreferrer">
				{text}
			</a>
		)
	},
	{
		title: "图片预览",
		dataIndex: "blenderRenderPicturesImgPath",
		key: "blenderRenderPicturesImgPath",
		render: text => <Image src={`http://source-media.casecasy.com/app/media/${text}-255x255.webp`} width={120} />
	},
	{
		title: "创建时间",
		dataIndex: "rawCreatedAt",
		key: "rawCreatedAt",
		render: text => <span>{dayjs(text).format("YYYY/MM/DD HH:MM:ss")}</span>
	}
];
export default columns;
