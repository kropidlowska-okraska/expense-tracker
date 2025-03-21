import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

type Item = {
	description: string;
	id: string;
	amount: number;
	date: Date;
}

type Props = {
	expenses: Item[];
};

function ExpensesList({ expenses }: Props) {
	return (
		<FlatList
			data={expenses}
			renderItem={itemData => <ExpenseItem {...itemData.item} />}
			keyExtractor={(item) => item.id}
		/>
	);
}

export default ExpensesList;
