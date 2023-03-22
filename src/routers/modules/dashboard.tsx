import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "Dashboard"
		},
		children: [
			{
				path: "/dashboard/dataVisualize",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/dataVisualize/index"))),
				meta: {
					requiresAuth: false,
					title: "数据可视化",
					key: "dataVisualize"
				}
			},
			{
				path: "/dashboard/detailTable",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/detailTable/index"))),
				meta: {
					requiresAuth: false,
					title: "详情表格",
					key: "detailTable"
				}
			}
		]
	}
];

export default dashboardRouter;
