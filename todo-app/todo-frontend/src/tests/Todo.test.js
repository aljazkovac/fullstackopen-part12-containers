import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../Todos/Todo';

describe('Todo Component', () => {
    const todoNotDone = {
        id: 1,
        text: 'Test todo',
        done: false,
    };

    const todoDone = {
        id: 2,
        text: 'Completed todo',
        done: true,
    };

    const mockDelete = jest.fn();
    const mockComplete = jest.fn();

    it('should render not done todo with text and buttons', () => {
        render(<Todo todo={todoNotDone} onClickDelete={mockDelete} onClickComplete={mockComplete} />);

        const todoText = screen.getByText('Test todo');
        expect(todoText).toBeInTheDocument();

        const deleteButton = screen.getByText('Delete');
        expect(deleteButton).toBeInTheDocument();

        const setAsDoneButton = screen.getByText('Set as done');
        expect(setAsDoneButton).toBeInTheDocument();
    });

    it('should call onClickDelete when delete button is clicked', () => {
        render(<Todo todo={todoNotDone} onClickDelete={mockDelete} onClickComplete={mockComplete} />);

        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);
        expect(mockDelete).toHaveBeenCalledWith(todoNotDone);
    });

    it('should call onClickComplete when set as done button is clicked', () => {
        render(<Todo todo={todoNotDone} onClickDelete={mockDelete} onClickComplete={mockComplete} />);

        const setAsDoneButton = screen.getByText('Set as done');
        fireEvent.click(setAsDoneButton);
        expect(mockComplete).toHaveBeenCalledWith(todoNotDone);
    });

    it('should render done todo with text and delete button only', () => {
        render(<Todo todo={todoDone} onClickDelete={mockDelete} onClickComplete={mockComplete} />);

        const todoText = screen.getByText('Completed todo');
        expect(todoText).toBeInTheDocument();

        const deleteButton = screen.getByText('Delete');
        expect(deleteButton).toBeInTheDocument();

        const setAsDoneButton = screen.queryByText('Set as done');
        expect(setAsDoneButton).toBeNull();
    });
});
