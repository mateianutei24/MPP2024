import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

var initialData = [
  {
    id: "2f983882-7429-4f68-a6de-6ec394fa30f1",
    name: "Company 1",
    address: "Address 1, Cluj-Napoca",
    numberOfEmployees: 54,
  },
  {
    id: "6a6a2c27-d8b2-4cc5-9b67-43f4d5d6f430",
    name: "Company 2",
    address: "Address 2, Cluj-Napoca",
    numberOfEmployees: 27,
  },
  {
    id: "cf77c618-3be1-4344-9125-7f5cf6428aeb",
    name: "Company 3",
    address: "Address 3, Cluj-Napoca",
    numberOfEmployees: 86,
  },
  {
    id: "3c7473cf-9ee6-4033-a8c0-dcf8ff8e1a15",
    name: "Company 4",
    address: "Address 4, Cluj-Napoca",
    numberOfEmployees: 18,
  },
  {
    id: "68f9d240-77ae-4df1-8d5a-5117f28b607f",
    name: "Company 5",
    address: "Address 5, Cluj-Napoca",
    numberOfEmployees: 91,
  },
  {
    id: "ff6de648-c42d-43b3-bcc8-4cc61a5baf5e",
    name: "Company 6",
    address: "Address 6, Cluj-Napoca",
    numberOfEmployees: 7,
  },
  {
    id: "be19ec77-b63a-405f-a5f3-2e78ef848b12",
    name: "Company 7",
    address: "Address 7, Cluj-Napoca",
    numberOfEmployees: 83,
  },
  {
    id: "dc4dc510-4c5b-4e8e-af04-f1aa9ed7ef0b",
    name: "Company 8",
    address: "Address 8, Cluj-Napoca",
    numberOfEmployees: 44,
  },
  {
    id: "b4ebd389-bb47-4dcf-b88c-4f8912776f60",
    name: "Company 9",
    address: "Address 9, Cluj-Napoca",
    numberOfEmployees: 96,
  },
  {
    id: "c23ccf0b-59a9-468d-b760-1baf5eece9f0",
    name: "Company 10",
    address: "Address 10, Cluj-Napoca",
    numberOfEmployees: 72,
  },
  {
    id: "fc3f1a54-6e3c-4ba7-9b3c-8d1e4d3fc5ac",
    name: "Company 11",
    address: "Address 11, Cluj-Napoca",
    numberOfEmployees: 82,
  },
  {
    id: "ebca85ee-7c6e-498e-99c7-0367435f2fb7",
    name: "Company 12",
    address: "Address 12, Cluj-Napoca",
    numberOfEmployees: 63,
  },
  {
    id: "14f1069a-bd3c-49a0-90ef-f20e2b5e7d3e",
    name: "Company 13",
    address: "Address 13, Cluj-Napoca",
    numberOfEmployees: 21,
  },
  {
    id: "cd21d6aa-9df4-4eac-b1c8-61fa6f2b1d9a",
    name: "Company 14",
    address: "Address 14, Cluj-Napoca",
    numberOfEmployees: 39,
  },
  {
    id: "c0216e0f-611e-42a6-8a84-4a75b6d4ab0a",
    name: "Company 15",
    address: "Address 15, Cluj-Napoca",
    numberOfEmployees: 51,
  },
  {
    id: "53dfe5cb-504f-4478-bf3b-91b16e51d8b1",
    name: "Company 16",
    address: "Address 16, Cluj-Napoca",
    numberOfEmployees: 19,
  },
  {
    id: "27a2c81b-9494-47a4-b9a0-8a2f1e8745e3",
    name: "Company 17",
    address: "Address 17, Cluj-Napoca",
    numberOfEmployees: 32,
  },
  {
    id: "2f6d66a1-5d8e-49a5-91cf-8a3f20b71d11",
    name: "Company 18",
    address: "Address 18, Cluj-Napoca",
    numberOfEmployees: 13,
  },
  {
    id: "d15808fc-7154-4c84-8db2-e49dd49e5454",
    name: "Company 19",
    address: "Address 19, Cluj-Napoca",
    numberOfEmployees: 68,
  },
  {
    id: "c2d2e6a4-82d0-4aa6-9956-f5aa0df2a0b9",
    name: "Company 20",
    address: "Address 20, Cluj-Napoca",
    numberOfEmployees: 47,
  },
];

function TableComponent() {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    address: "",
    numberOfEmployees: "",
  });

  const handleOpen = (item) => {
    if (item.id != null) {
      setFormData(item);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: null,
      name: "",
      address: "",
      numberOfEmployees: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (formData.id === null) {
      // Generate new id
      const id = uuidv4();

      // Create a new object with updated id
      const newItem = {
        ...formData,
        id: id,
      };

      // Add new item to data array
      setData([newItem, ...data]);
    } else {
      // Update existing item
      setData(data.map((item) => (item.id === formData.id ? formData : item)));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSort = () => {
    const sortedData = [...data].sort(
      (a, b) => a.numberOfEmployees - b.numberOfEmployees
    );
    setData(sortedData);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "numberOfEmployees",
      headerName: "Number of Employees",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <EditIcon
            color="primary"
            title="editIcon"
            onClick={() => handleOpen(params.row)}
            style={{ marginRight: "8px", cursor: "pointer" }}
          />
          <DeleteIcon
            color="secondary"
            title="deleteIcon"
            onClick={() => handleDelete(params.row.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <Button
        style={{ marginBottom: 8 }}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Add Item
      </Button>

      <Button
        style={{ marginBottom: 8, marginLeft: 8 }}
        variant="contained"
        color="primary"
        onClick={handleSort}
      >
        Sort items
      </Button>

      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableCheckboxSelection
        disableRowSelectionOnClick
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Company Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Company Address"
            type="text"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Company Number of Employees"
            type="number"
            fullWidth
            name="numberOfEmployees"
            value={formData.numberOfEmployees}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TableComponent;
