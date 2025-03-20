import { View, Text } from 'react-native';

type Props = {
    expenses: {
        id: string;
        description: string;
        amount: number;
        date: Date;
    }[]
    periodName: string;
}

function ExpensesSummary({ expenses, periodName }: Props) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;