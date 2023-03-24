import Curve from "./components/curve";
import "./index.less";
import AddPerson from "./images/add_person.png";
import AddTeam from "./images/add_team.png";
import Today from "./images/today.png";
// import BookSum1 from "./images/book_sum.png";

import React, { useEffect, useState } from "react";
import { Tag, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useGeneralData } from "./hooks/useGeneralData";

import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { TABLE_DETAIL } from "@/config/config";

import { Tabs } from "antd";
import type { TabsProps } from "antd";

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

	const [dateRangeLabel, setDateRangeLabel] = useState<any>("今天");

	const onRangeChange = (dates: null | (Dayjs | null)[]) => {
		if (dates) {
			const matchedPresetItem = rangePresets.find(item => _.isEqual(dates, item.value));
			setDateRangeLabel(matchedPresetItem?.label);

			console.log("From: ", dates[0]?.toISOString(), ", to: ", dates[1]?.toISOString());
			setDateRange([dates[0]?.toISOString(), dates[1]?.toISOString()]);
		} else {
			console.log("Clear");
		}
	};

	const generalData = useGeneralData(dateRange);
	const { rawDataPinImg, blenderRenderPic, sendPostLog } = generalData;
	const [cardTitle, setCardTitle] = useState<any>("各个卡片");

	const [chartData, setChartData] = useState<any>(null);
	const [chartDataGroupById, setChartDataGroupById] = useState<any>(null);
	console.log("🚀 ~ file: index.tsx:62 ~ DataVisualize ~ chartDataGroupById:", chartDataGroupById);

	const onClickCard = (dataType: IDataType) => {
		setCardTitle(dataType);

		const activeData: any = Object.values(generalData[dataType])[0];

		let reslutData = null;

		/**
		 * 1）按日期统计
		 */
		// 处理日期
		// if preset 日期 === 今天， 则以时间维度；否则日期维度
		if (dayjs(dateRange[0]).format(dateFormat) === dayjs().format(dateFormat)) {
			reslutData = activeData.map((item: any) => {
				return {
					...item,
					createdAt: dayjs(item.createdAt).format("YYYY/MM/DD HH"),
					rawCreatedAt: item.createdAt,
					blenderRenderPicturesImgPath: item.blenderRenderPictures?.imagePath
				};
			});
		} else {
			reslutData = activeData.map((item: any) => {
				return {
					...item,
					createdAt: dayjs(item.createdAt).format("YYYY/MM/DD"),
					rawCreatedAt: item.createdAt,
					blenderRenderPicturesImgPath: item.blenderRenderPictures?.imagePath
				};
			});
		}
		const groupByDate = _.groupBy(reslutData, "createdAt");

		const countedGroupByData = Object.keys(groupByDate).map(key => {
			return {
				dateTime: key,
				value: groupByDate[key]?.length || 0,
				rawData: groupByDate[key]
			};
		});
		setChartData(countedGroupByData);

		/**
		 * 2）按 nox id 统计
		 */
		const groupById = _.groupBy(reslutData, "pinterestBotInfo.noxName");
		console.log("🚀 ~ file: index.tsx:115 ~ onClickCard ~ groupById:", groupById);
		const countedGroupById = Object.keys(groupById).map(key => {
			return {
				dateTime: key,
				value: groupById[key]?.length || 0,
				rawData: groupById[key]
			};
		});
		setChartDataGroupById(countedGroupById);
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

	const onTabChange = (key: string) => {
		console.log("🚀 ~ file: index.tsx:136 ~ onTabChange ~ key:", key);
	};

	useEffect(() => {
		setTimeout(() => {
			generalData.loading ? null : onClickCard("sendPostLog");
		}, 1000);
	}, [dateRange]);
	const tabItems: TabsProps["items"] = [
		{
			key: "1",
			label: `按日期统计`,
			children: (
				<div className="curve-echarts">{chartData ? <Curve chartData={chartData} barClickEvent={barClickEvent} /> : null}</div>
			)
		},
		{
			key: "2",
			label: `按虚拟机id统计`,
			children: (
				<div className="curve-echarts">
					{chartDataGroupById ? <Curve chartData={chartDataGroupById} barClickEvent={barClickEvent} /> : null}
				</div>
			)
		}
	];

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
				<Tag color={"#2db7f5"} style={{ marginLeft: "20px", padding: "4px 10px 4px" }}>
					{dateRangeLabel}
				</Tag>

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
				<Tabs defaultActiveKey="1" items={tabItems} onChange={onTabChange} style={{ marginTop: "40px", marginLeft: "40px" }} />
				{/*  NOTE - 数据展示：如果是今天就按小时归类；如果是一周就按天归类 */}
			</div>
		</div>
	);
};

export default DataVisualize;
