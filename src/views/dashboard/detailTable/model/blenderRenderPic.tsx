import dayjs from "dayjs";
import { Image } from "antd";
import { Switch } from "antd";

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
		title: "是否已获取",
		dataIndex: "isRetrieved",
		key: "isRetrieved",
		render: text => <Switch disabled={true} defaultChecked={text} />
	},
	{
		title: "图片",
		dataIndex: "imagePath",
		key: "imagePath",
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
