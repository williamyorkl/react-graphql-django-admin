import Pie from "./components/pie";
import Curve from "./components/curve";
import "./index.less";
import AddPerson from "./images/add_person.png";
import AddTeam from "./images/add_team.png";
import Today from "./images/today.png";
import BookSum1 from "./images/book_sum.png";

import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useGeneralData } from "./hooks/useGeneralData";
const DataVisualize = () => {
	const { RangePicker } = DatePicker;

	const rangePresets: {
		label: string;
		value: [Dayjs, Dayjs];
	}[] = [
		{ label: "近1天", value: [dayjs().add(-1, "d"), dayjs()] },
		{ label: "近7天", value: [dayjs().add(-7, "d"), dayjs()] },
		{ label: "近14天", value: [dayjs().add(-14, "d"), dayjs()] },
		{ label: "近30天", value: [dayjs().add(-30, "d"), dayjs()] },
		{ label: "近90天", value: [dayjs().add(-90, "d"), dayjs()] }
	];

	const [dateRange, setDateRange] = useState<any>([
		rangePresets[0]["value"][0].toISOString(),
		rangePresets[0]["value"][1].toISOString()
	]);

	const onRangeChange = (dates: null | (Dayjs | null)[]) => {
		if (dates) {
			console.log("From: ", dates[0]?.toISOString(), ", to: ", dates[1]?.toISOString());
			setDateRange([dates[0]?.toISOString(), dates[1]?.toISOString()]);
		} else {
			console.log("Clear");
		}
	};

	const generalData = useGeneralData(dateRange);
	const { rawDataPinImg, blenderRenderPic, sendPostLog } = generalData;
	console.log("🚀 ~ file: index.tsx:39 ~ DataVisualize ~ generalData:", generalData);

	return (
		<div className="dataVisualize-box">
			<div className=" card top-box">
				<div className="top-title">数据可视化</div>
				<RangePicker presets={rangePresets} showTime format="YYYY/MM/DD HH:mm:ss" onChange={onRangeChange} />

				<div className="top-content">
					<div className="item-center">
						<div className="raw-data-pin-img-count traffic-box">
							<div className="traffic-img">
								<img src={AddPerson} alt="" />
							</div>
							<span className="item-value">{rawDataPinImg?.rawDataPinterestImg.length}</span>
							<span className="traffic-name sle">新增爬虫图片</span>
						</div>
						<div className="gitHub-traffic traffic-box">
							<div className="traffic-img">
								<img src={AddTeam} alt="" />
							</div>
							<span className="item-value">{blenderRenderPic?.blenderPictures.length}</span>
							<span className="traffic-name sle">新渲染图片</span>
						</div>
						<div className="today-traffic traffic-box">
							<div className="traffic-img">
								<img src={Today} alt="" />
							</div>
							<span className="item-value">{sendPostLog?.pinterestLogs.length}</span>
							<span className="traffic-name sle">新发送图片</span>
						</div>
						{/* <div className="yesterday-traffic traffic-box">
							<div className="traffic-img">
								<img src={BookSum1} alt="" />
							</div>
							<span className="item-value">1234</span>
							<span className="traffic-name sle">昨日访问量</span>
						</div> */}
					</div>
					<div className="item-right">
						<div className="echarts-title">Gitee / GitHub 访问量占比</div>
						<div className="book-echarts">
							<Pie />
						</div>
					</div>
				</div>
			</div>
			<div className="card bottom-box">
				<div className="bottom-title">数据来源</div>
				<div className="bottom-tabs">
					<RangePicker presets={rangePresets} showTime format="YYYY/MM/DD HH:mm:ss" onChange={onRangeChange} />
				</div>
				<div className="curve-echarts">
					<Curve />
				</div>
			</div>
		</div>
	);
};

export default DataVisualize;
