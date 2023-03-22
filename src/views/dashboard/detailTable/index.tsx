import { Table } from "antd";
import { useLocation } from "react-router-dom";
import sendPostLogColumns from "./model/sendPostLog";
import blenderRenderPicColumns from "./model/blenderRenderPic";
import rawDataPinImgColumns from "./model/rawDataPinImg";
import { IDataType } from "@/views/dashboard/dataVisualize";

const DetailTable = () => {
	const location = useLocation();
	const { state } = location;
	console.log("🚀 ~ file: index.tsx:11 ~ DetailTable ~ state:", state);
	const { dataType, data } = state as {
		dataType: IDataType;
		data: any;
	};

	const columnMap = {
		sendPostLog: sendPostLogColumns,
		rawDataPinImg: rawDataPinImgColumns,
		blenderRenderPic: blenderRenderPicColumns
	};

	const paginationProps = {
		showSizeChanger: true,
		showQuickJumper: true,
		defaultPageSize: 15,
		showTotal: (total: any) => {
			return `共 ${total} 条`;
		}
	};
	return (
		<div>
			<Table columns={columnMap[dataType]} dataSource={data} pagination={paginationProps} />
		</div>
	);
};

export default DetailTable;
