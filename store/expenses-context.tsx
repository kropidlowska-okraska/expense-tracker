import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		description: "A pair of shoes",
		amount: 59.99,
		date: new Date("2021-12-19"),
	},
	{
		id: "e2",
		description: "A pair of trousers",
		amount: 89.29,
		date: new Date("2022-01-05"),
	},
	{
		id: "e3",
		description: "Some bananas",
		amount: 5.99,
		date: new Date("2021-12-01"),
	},
	{
		id: "e4",
		description: "A book",
		amount: 14.99,
		date: new Date("2022-02-19"),
	},
	{
		id: "e5",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-02-18"),
	},
	{
		id: "e6",
		description: "A pair of trousers",
		amount: 89.29,
		date: new Date("2022-01-05"),
	},
	{
		id: "e7",
		description: "Some bananas",
		amount: 5.99,
		date: new Date("2021-12-01"),
	},
	{
		id: "e8",
		description: "A book",
		amount: 14.99,
		date: new Date("2022-02-19"),
	},
	{
		id: "e9",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-02-18"),
	},
];

interface Expense {
	id: string;
	description: string;
	amount: number;
	date: Date;
}

interface ExpensesContextType {
	expenses: Expense[];
	addExpense: (expense: Omit<Expense, "id">) => void;
	deleteExpense: (id: string) => void;
	updateExpense: (id: string, expenseData: Omit<Expense, "id">) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
	expenses: [],
	addExpense: () => {},
	deleteExpense: () => {},
	updateExpense: () => {},
});

interface ExpensesState extends Array<Expense> {}

interface AddAction {
	type: "ADD";
	payload: Omit<Expense, "id">;
}

interface UpdateAction {
	type: "UPDATE";
	payload: { id: string; data: Omit<Expense, "id"> };
}

interface DeleteAction {
	type: "DELETE";
	payload: string;
}

type ExpensesAction = AddAction | UpdateAction | DeleteAction;

function expensesReducer(
	state: ExpensesState,
	action: ExpensesAction,
): ExpensesState {
	switch (action.type) {
		case "ADD": {
			const id = new Date().toString() + Math.random().toString();
			return [{ ...action.payload, id: id }, ...state];
		}
		case "UPDATE": {
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id,
			);
			const updatableExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;
		}
		case "DELETE":
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
}

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

	function addExpense(expenseData: Omit<Expense, "id">): void {
		dispatch({ type: "ADD", payload: expenseData });
	}

	function deleteExpense(id: string) {
		dispatch({ type: "DELETE", payload: id });
	}

	function updateExpense(id: string, expenseData: Omit<Expense, "id">): void {
		dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
	}

	const contextValue: ExpensesContextType = {
		expenses: expensesState,
		addExpense,
		deleteExpense,
		updateExpense,
	};

	return (
		<ExpensesContext.Provider value={contextValue}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
