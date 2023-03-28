import { useEcharts } from "@/hooks/useEcharts";

const Curve = ({ chartData, barClickEvent }: any) => {
	let filteredNoxPlayer = chartData;
	let data = null;

	// 判断dateTime 是否为日期还是 Noxplayer
	if (chartData.some((i: any) => i.dateTime?.indexOf("NoxPlayer") !== -1)) {
		filteredNoxPlayer = chartData.filter((i: any) => i.dateTime && i.dateTime.indexOf("NoxPlayer") !== -1);

		filteredNoxPlayer.sort((a: { dateTime: string }, b: { dateTime: any }) => {
			return Number(a.dateTime?.split("NoxPlayer")[1]) - Number(b.dateTime?.split("NoxPlayer")[1]);
		});

		data = [...new Set([...filteredNoxPlayer, ...chartData])];
	} else {
		filteredNoxPlayer.sort((a: { dateTime: string }, b: { dateTime: any }) => {
			return a.dateTime.localeCompare(b.dateTime);
		});

		data = filteredNoxPlayer;
	}

	console.log("🚀 ~ file: curve.tsx:17 ~ Curve ~ data:", data);

	const option: any = {
		tooltip: {
			trigger: "axis",
			backgroundColor: "transparent",
			axisPointer: {
				type: "none"
			},
			padding: 0,
			formatter: (p: any) => {
				let bot_info_string = null;
				if (p[0].data.behaviorData) {
					bot_info_string = Object.keys(p[0].data.behaviorData)
						.map((val: any) => {
							if (val !== "__typename") {
								return `
										<div style="display: flex;align-items: center;"><div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>
										${val}:  ${p[0].data.behaviorData[val as any]}
										</div>
									`;
							}
						})
						.join("");
				}
				// console.log("bot_info_string", bot_info_string);
				let dom = `<div style="width:100%; height: 170px !important; display:flex;flex-direction: column;justify-content: space-between;padding:10px;box-sizing: border-box;
      color:#fff; background: #6B9DFE;border-radius: 4px;font-size:14px; ">
        <div style="display: flex; align-items: center;"> <div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>平台 :  ${p[0].name}</div>
        <div style="display: flex;align-items: center;"><div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>发帖数据量 :  ${p[0].value}</div>
				${bot_info_string}
      </div>`;
				return dom;
			}
		},
		toolbox: {
			show: true,
			orient: "horizontal"
		},
		grid: {
			left: "5%",
			right: "6%"
		},
		dataZoom: [
			{
				show: true,
				height: 20,
				zoomLock: false,
				type: "slider",
				xAxisIndex: [0],
				left: "center", //组件离容器左侧的距离,'left', 'center', 'right','20%'
				top: "top", //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
				right: "auto", //组件离容器右侧的距离,'20%'
				bottom: "auto",
				start: 0, //数据窗口范围的起始数值
				end: 100, //数据窗口范围的结束数值
				handleStyle: {
					color: "#6b9dfe"
				},
				textStyle: {
					color: "transparent"
				}
			}
		],
		xAxis: [
			{
				type: "category",
				data: data.map((val: any) => {
					return {
						value: val.dateTime
					};
				}),
				axisTick: {
					show: false
				},
				axisLabel: {
					margin: 20,
					interval: 0,
					color: "#a1a1a1",
					fontSize: 14,
					formatter: function (value: any) {
						if (value === "[object Object]") {
							return "null";
						} else {
							return value?.split("NoxPlayer")[1] || value;
						}
					}
				},
				axisLine: {
					lineStyle: {
						color: "#F6F6F7",
						width: 2
					}
				}
			}
		],
		yAxis: [
			{
				min: 0,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						type: "dashed",
						color: "#edeff5",
						width: 2
					}
				},
				axisLabel: {
					color: "#a1a1a1",
					fontSize: 16,
					fontWeight: 400,
					formatter: function (value: any) {
						return value;
					}
				}
			}
		],
		series: [
			{
				name: "Direct",
				type: "bar",
				data: data.map((val: any) => {
					return {
						value: val.value,
						rawData: val.rawData,
						behaviorData: val.behaviorData
					};
				}),
				barWidth: "35px",
				itemStyle: {
					color: "#C5D8FF",
					borderRadius: [12, 12, 0, 0]
				},
				emphasis: {
					itemStyle: {
						color: "#6B9DFE"
					}
				}
			}
		]
	};
	const [echartsRef] = useEcharts(option, data, barClickEvent);

	return <div ref={echartsRef} className="content-box"></div>;
};

export default Curve;
