import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
    test("renders correctly with initial todos", () => {
        render(<TodoList />);
        expect(screen.getByText("Learn React")).toBeInTheDocument();
        expect(screen.getByText("Build a Project")).toBeInTheDocument();
    });

    test("can add a new todo", () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText("Add a new todo");
        const button = screen.getByText("Add Todo");

        fireEvent.change(input, { target: { value: "New Todo Item" } });
        fireEvent.click(button);

        expect(screen.getByText("New Todo Item")).toBeInTheDocument();
    });

    test("can toggle a todo completion status", () => {
        render(<TodoList />);
        const todoItem = screen.getByText("Learn React");

        // Initial state: not completed (no line-through)
        expect(todoItem.parentElement).not.toHaveStyle("text-decoration: line-through");

        fireEvent.click(todoItem);

        // After toggle: completed
        expect(todoItem.parentElement).toHaveStyle("text-decoration: line-through");
    });

    test("can delete a todo", () => {
        render(<TodoList />);
        const todoItem = screen.getByText("Learn React");
        const deleteButton = todoItem.nextSibling;

        fireEvent.click(deleteButton);

        expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
    });
});
