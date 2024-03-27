/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TableComponent from "../src/TableComponent";
import "@testing-library/jest-dom";

function lab1_tests() {
  test("adding an item", () => {
    const { getByText, getByLabelText } = render(<TableComponent />);

    // Click on the "Add Item" button
    fireEvent.click(getByText("Add Item"));

    // Fill in the form fields

    fireEvent.change(getByLabelText("Company Name"), {
      target: { value: "New Company" },
    });
    fireEvent.change(getByLabelText("Company Address"), {
      target: { value: "New Address" },
    });
    fireEvent.change(getByLabelText("Company Number of Employees"), {
      target: { value: "10" },
    });

    fireEvent.click(getByText("Save"));

    expect(getByText("New Company")).toBeInTheDocument();
    expect(getByText("New Address")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });

  // Test for deleting an item
  test("deleting an item", () => {
    const { getByText, queryByText } = render(<TableComponent />);

    // Click on the delete icon of the first item
    fireEvent.click(screen.getAllByTitle("deleteIcon")[0]);

    // Check if the item is deleted from the table
    expect(queryByText("Company 1")).not.toBeInTheDocument();
  });

  //   // Test for editing an item
  test("editing an item", () => {
    const { getByText, getByLabelText } = render(<TableComponent />);

    // Click on the edit icon of the first item
    fireEvent.click(screen.getAllByTitle("editIcon")[0]);

    // Modify the form fields
    fireEvent.change(getByLabelText("Company Name"), {
      target: { value: "Updated Company" },
    });

    // Click on the "Save" button
    fireEvent.click(getByText("Save"));

    // Check if the item is updated in the table
    expect(getByText("Updated Company")).toBeInTheDocument();
  });

  test("test sort", () => {
    const { getByText, getByLabelText } = render(<TableComponent />);
    fireEvent.click(getByText("Sort items"));

    const tableRows = screen.getAllByRole("row");

    // Skip header row
    console.log(tableRows);

    const companyNumberOfEmployeesValues = tableRows
      .slice(1)
      .map((row) => row.children[3].textContent); // Get company name from first cell of each row

    var ascendingOrder = true;
    console.log(companyNumberOfEmployeesValues);
    for (let i = 0; i < companyNumberOfEmployeesValues.length - 1; i++) {
      if (
        parseInt(companyNumberOfEmployeesValues[i]) >
        parseInt(companyNumberOfEmployeesValues[i + 1])
      ) {
        ascendingOrder = false;
      }
    }
    expect(ascendingOrder).toBe(true);
  });
}

lab1_tests();
