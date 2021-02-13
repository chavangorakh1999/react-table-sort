import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function DTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/";

  useEffect(() => {
    getlist();
  }, [searchTerm]);

  const getlist = () => {
    axios
      .get(`${url}todos`)
      .then((res) => {
        const todoList = res.data;
        setSearchResults(todoList);
      })
      .catch((error) => console.error(`Error:${error}`));
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedElement = () => {
    var searchList = searchResults.filter((e) => {
      return e.id === Number(searchTerm) || e.title.includes(searchTerm);
    });
    return searchList;
  };

  const user = (u) => {
    axios
      .get(`${url}users/` + u)
      .then((res) => {
        const todoListUser = res.data;
        console.log(todoListUser);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        // value={searchTerm}
        onChange={handleChange}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ToDo ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchTerm !== ""
            ? searchedElement().map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.completed ? "Complete" : "Incomplete"}</td>
                  <td>
                    <button onClick={() => user(item.userId)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            : searchResults.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.completed ? "Complete" : "Incomplete"}</td>
                  <td>
                    <button onClick={() => user(item.userId)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}
