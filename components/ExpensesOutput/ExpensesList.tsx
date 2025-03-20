import { FlatList, Text } from "react-native";

type ItemData = {
	item: {
		description: string;
		id: string;
	};
};

type Props = {
	expenses: {
		description: string;
		id: string;
	}[];
};

function renderExpenseItem(itemData: ItemData) {
	return <Text>{itemData.item.description}</Text>;
}

function ExpensesList({ expenses }: Props) {
	return (
		<FlatList
			data={expenses}
			renderItem={renderExpenseItem}
			keyExtractor={(item) => item.id}
		/>
	);
}

export default ExpensesList;
