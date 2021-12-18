import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
	state: {
		isLoggedIn: false,
		num: "",
		name: "",
		log: [],
	}, mutations: {
		async login(state, {num, name}) {
			if (state.isLoggedIn) return;
			let ret = await axios.post("https://dnhs-contest.nlog.dev/api/student/check", JSON.stringify({num, name}), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (ret.data.result !== 0) {
				alert("학번 또는 이름을 다시 확인하세요.");
				localStorage.clear();
				location.reload();
				return;
			}

			localStorage.setItem("num", num);
			localStorage.setItem("name", name);

			state.isLoggedIn = true;
			state.num = num;
			state.name = name;

			axios.post("https://dnhs-contest.nlog.dev/api/student/log", JSON.stringify({num, name}), {
				headers: {
					"Content-Type": "application/json",
				},
			}).then(ret => state.log = ret.data.result_data.reverse().slice(0, 5).map(t => new Date(t)));
		}
	},
	actions: {},
	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn;
		},
		num(state) {
			return state.num;
		},
		name(state) {
			return state.name;
		},
		log(state) {
			return state.log;
		},
	},
	modules: {}
})
