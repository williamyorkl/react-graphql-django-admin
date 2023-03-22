import Curve from "./components/curve";
import "./index.less";
import AddPerson from "./images/add_person.png";
import AddTeam from "./images/add_team.png";
import Today from "./images/today.png";
// import BookSum1 from "./images/book_sum.png";

import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useGeneralData } from "./hooks/useGeneralData";

import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { TABLE_DETAIL } from "@/config/config";

export type IDataType = "rawDataPinImg" | "blenderRenderPic" | "sendPostLog";

const DataVisualize = () => {
	const navigate = useNavigate();
	const { RangePicker } = DatePicker;

	const dateFormat = "YYYY/MM/DD";
	const todayRange = [dayjs(), dayjs()].map((d: any) => d.format(dateFormat));

	const rangePresets: {
		label: string;
		value: [Dayjs, Dayjs];
	}[] = [
		{ label: "今天", value: [dayjs(todayRange[0]), dayjs()] },
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
	const [cardTitle, setCardTitle] = useState<any>(null);

	const [chartData, setChartData] = useState<any>(null);
	const onClickCard = (dataType: IDataType) => {
		setCardTitle(dataType);

		const activeData: any = Object.values(generalData[dataType])[0];
		console.log("🚀 ~ file: index.tsx:54 ~ onClickCard ~ activeData:", activeData);

		let reslutData = null;

		// 处理日期
		// if preset 日期 === 今天， 则以时间维度；否则日期维度
		if (dayjs(dateRange[0]).format(dateFormat) === dayjs().format(dateFormat)) {
			reslutData = activeData.map((item: any) => {
				return {
					...item,
					createdAt: dayjs(item.createdAt).format("YYYY/MM/DD HH"),
					rawCreatedAt: item.createdAt
				};
			});
		} else {
			reslutData = activeData.map((item: any) => {
				return {
					...item,
					createdAt: dayjs(item.createdAt).format("YYYY/MM/DD"),
					rawCreatedAt: item.createdAt
				};
			});
		}
		const groupByData = _.groupBy(reslutData, "createdAt");

		const countedGroupByData = Object.keys(groupByData).map(key => {
			return {
				dateTime: key,
				value: groupByData[key]?.length || 0,
				rawData: groupByData[key]
			};
		});

		console.log("🚀 ~ file: index.tsx:84 ~ Object.keys ~ countedGroupByData:", countedGroupByData);

		setChartData(countedGroupByData);
	};

	/**
	 * 柱形图点击时间
	 */
	const barClickEvent = (param: any) => {
		const targetVal = chartData.find((i: any) => i.dateTime === param.name);
		console.log("🚀 ~ file: index.tsx:101 ~ barClickEvent ~ targetVal:", targetVal);

		navigate(TABLE_DETAIL, {
			state: {
				data: targetVal.rawData,
				dataType: cardTitle
			}
		});
	};

	useEffect(() => {
		setTimeout(() => {
			generalData.loading ? null : onClickCard("sendPostLog");
		}, 1000);
	}, [dateRange]);

	return (
		<div className="dataVisualize-box">
			<div className=" card top-box">
				<div className="top-title">数据可视化</div>
				<RangePicker
					presets={rangePresets}
					showTime
					format="YYYY/MM/DD HH:mm:ss"
					onChange={onRangeChange}
					defaultValue={[dayjs(todayRange[0]), dayjs()]}
				/>

				<div className="top-content">
					<div className="item-center">
						<div className="raw-data-pin-img-count traffic-box" onClick={() => onClickCard("rawDataPinImg")}>
							<div className="traffic-img">
								<img src={AddPerson} alt="" />
							</div>
							<span className="item-value">{rawDataPinImg?.rawDataPinterestImg.length}</span>
							<span className="traffic-name sle">新增爬虫图片</span>
						</div>
						<div className="gitHub-traffic traffic-box" onClick={() => onClickCard("blenderRenderPic")}>
							<div className="traffic-img">
								<img src={AddTeam} alt="" />
							</div>
							<span className="item-value">{blenderRenderPic?.blenderPictures.length}</span>
							<span className="traffic-name sle">新渲染图片</span>
						</div>
						<div className="today-traffic traffic-box" onClick={() => onClickCard("sendPostLog")}>
							<div className="traffic-img">
								<img src={Today} alt="" />
							</div>
							<span className="item-value">{sendPostLog?.pinterestLogs.length}</span>
							<span className="traffic-name sle">新发送图片</span>
						</div>
					</div>
				</div>
			</div>
			<div className="card bottom-box">
				<div className="bottom-title">{cardTitle}数据</div>
				<div className="curve-echarts">
					{/*  NOTE - 数据展示：如果是今天就按小时归类；如果是一周就按天归类 */}
					{chartData ? <Curve chartData={chartData} barClickEvent={barClickEvent} /> : null}
				</div>
			</div>
		</div>
	);
};

export default DataVisualize;
