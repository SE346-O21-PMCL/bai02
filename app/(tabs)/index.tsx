import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from "react-native";

import axios from "axios";
import { useEffect, useState } from "react";

type TSchool = {
	alpha_two_code: string;
	web_pages: string[];
	"state-province": string | null;
	name: string;
	domains: string[];
	country: string;
};

export default function TabOneScreen() {
	const [data, setData] = useState<TSchool[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				"http://universities.hipolabs.com/search?country=United%20States"
			);
			if (response.status == 200) {
				setData(response.data);
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView>
				{data.map(({ name, country, web_pages }) => (
					<TouchableNativeFeedback>
						<View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
							<Text style={{ fontSize: 18, fontWeight: "600" }}>
								{name}
							</Text>
							<Text style={{ color: "#888" }}>{country}</Text>
							<View style={{ marginTop: 8 }}>
								{web_pages.map((page) => (
									<Text>{page}</Text>
								))}
							</View>
						</View>
					</TouchableNativeFeedback>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		gap: 50,
		backgroundColor: "white",
		// alignItems: "center",
		// justifyContent: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
	main: {},
	label: {
		fontSize: 20,
		marginBottom: 10,
		fontWeight: "600",
		marginTop: 30,
	},
	input: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		fontSize: 20,
		borderRadius: 5,
	},
	message: {
		fontSize: 20,
		color: "red",
	},
	button: {
		textTransform: "capitalize",
	},
});
