import { useLayoutEffect } from "react";
import { Text } from "react-native";

type Props = {
	route: {
		params: {
			expenseId: string;
		};
	};
  navigation: {
    setOptions: (options: { title: string }) => void;
  };
};

function ManageExpense({ route, navigation }: Props) {
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	return <Text>ManageExpense Screen</Text>;
}

export default ManageExpense;
