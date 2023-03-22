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
		title: "图片下载链接",
		dataIndex: "imgDownloadLink",
		key: "imgDownloadLink",
		render: (text: any) => (
			<div>
				<a href={text} target="_blank" rel="noreferrer">
					{text}
				</a>
			</div>
		)
	},
	{
		title: "图片预览",
		dataIndex: "imgDownloadLink",
		key: "imgDownloadLink",
		render: text => <Image src={text} width={50} />
	},
	{
		title: "创建时间",
		dataIndex: "rawCreatedAt",
		key: "rawCreatedAt",
		render: text => <span>{dayjs(text).format("YYYY/MM/DD HH:MM:ss")}</span>
	}
];
export default columns;
