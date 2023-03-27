import { useEcharts } from "@/hooks/useEcharts";

const Curve = ({ chartData, barClickEvent }: any) => {
	const data = chartData.sort((a: { dateTime: string }, b: { dateTime: any }) => {
		if (a.dateTime.indexOf("NoxPlayer") !== -1) {
			console.log(`Number(b.dateTime.split("NoxPlayer")[1]`, Number(b.dateTime.split("NoxPlayer")[1]));

			return Number(a.dateTime.split("NoxPlayer")[1]) - Number(b.dateTime.split("NoxPlayer")[1]);
		} else {
			return a.dateTime.localeCompare(b.dateTime);
		}
	});
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
				let bot_info_string = Object.keys(p[0].data.rawData[0].pinterestBotInfo.pinterestBotBehaviour[0])
					.map((val: any) => {
						if (val !== "__typename") {
							return `
									<div style="display: flex;align-items: center;"><div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>
									${val}:  ${p[0].data.rawData[0].pinterestBotInfo.pinterestBotBehaviour[0][val as any]}
									</div>
								`;
						}
					})
					.join("");
				console.log("bot_info_string", bot_info_string);
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
				height: 10,
				xAxisIndex: [0],
				bottom: 0,
				startValue: 0, //数据窗口范围的起始数值
				endValue: 9, //数据窗口范围的结束数值
				handleStyle: {
					color: "#6b9dfe"
				},
				textStyle: {
					color: "transparent"
				}
			},
			{
				type: "inside",
				show: true,
				height: 0,
				zoomLock: true //控制伸缩
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
					// interval: time > 4 ? 27 : 0,
					margin: 20,
					interval: 0,
					color: "#a1a1a1",
					fontSize: 14
					// formatter: function (name: string) {
					// 	undefined;
					// 	return name.length > 8 ? name.slice(0, 8) + "..." : name;
					// }
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
					formatter: function (value: number) {
						if (value === 0) {
							return value;
						} else if (value >= 10000) {
							return value / 10000 + "w";
						}
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
						rawData: val.rawData
					};
				}),
				barWidth: "45px",
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
