import ReactDOM from "react-dom";
import "@/styles/reset.less";
import "@/assets/iconfont/iconfont.less";
import "@/assets/fonts/font.less";
import "@/styles/common.less";
import "@/language/index";
import "virtual:svg-icons-register";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import App from "@/App";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/index";
// react 17 创建，控制台会报错，暂时不影响使用（菜单折叠时不会出现闪烁）
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);
