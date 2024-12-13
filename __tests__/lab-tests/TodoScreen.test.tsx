import { render, fireEvent } from '@testing-library/react-native';
import TodoScreen from "../../src/lab-tests/TodoScreen";

describe('lab-tests/TodoScreen', () => { 
    test('TDD: add task', () => { 
        const {getByTestId, getByText } = render(<TodoScreen />);

        const input = getByTestId('taskInput');
        const button = getByTestId('addButton');

        fireEvent.changeText(input, 'New task');
        fireEvent.press(button);

        expect(getByText('New task')).toBeTruthy();
    });

    test('BDD: marks a task as completed', () => {
        // Given: A list with an incomplete task
        const {getByTestId, getByText } = render(<TodoScreen />);

        const input = getByTestId('taskInput');
        const button = getByTestId('addButton');
        const text = 'New task';

        fireEvent.changeText(input, text);
        fireEvent.press(button);

        // When: The user taps "Complete" on the task
        const task = getByText(text);
        const complete = getByTestId(`completeButton-${task.props.testID.split('-')[1]}`);
        fireEvent.press(complete);

        // Then: The task's text should appear with strikethrough
        const updated = getByText(text);
        
        expect(updated.props.style).toEqual({ textDecorationLine: 'line-through' });
    });

    test('ATDD: deletes a task from the list', () => {
        const {getByTestId, getByText, queryByText } = render(<TodoScreen />);

        const input = getByTestId('taskInput');
        const button = getByTestId('addButton');
        const text = 'Task to Delete';

        fireEvent.changeText(input, text);
        fireEvent.press(button);

        const task = getByText(text);
        const deleteButton = getByTestId(`deleteButton-${task.props.testID.split('-')[1]}`);
        fireEvent.press(deleteButton);

        expect(queryByText(text)).toBeNull();
    });
 })