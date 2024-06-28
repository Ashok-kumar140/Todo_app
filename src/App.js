import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Table from "./components/Table";
import toast from "react-hot-toast";
function App() {
  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchMode,setSearchMode] = useState(false);

  useEffect(() => {
    showAllEntries();
  }, []);

  const addEntry = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.BASE_URL}/api/v1/addEntry`,
        {
          Name: userName,
        }
      );
      // console.log("Data entry", res);
      if (data.success) {
        setUserName("");
        toast.success("Entry added successfully");
      }
    } catch (error) {
      console.log("Error while adding new entry", error);
      toast.error("Failed to add entry.Please try again...");
    }
  };

  const showAllEntries = async () => {
    try {
      const { data } = await axios.get(
        "${process.env.BASE_URL}/api/v1/getAllEntries"
      );
      // console.log("All Entries", data);
      setEntries(data);
    } catch (error) {
      console.log("Error while fetching all entries", error);
    }
  };
  const deleteEntry = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.BASE_URL}/api/v1/deleteEntry/${id}`
      );
      if (data.success) {
        showAllEntries();
        toast.success("Entry deleted successfully");
      }
    } catch (error) {
      console.log("Error while deleting entry", error);
      toast.error("Failed to delete.Please try again...");
    }
  };

  const getEntryById = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.BASE_URL}/api/v1/getEntry/${id}`
      );
      console.log("data after updated", data[0].Name);

      setUserName(data[0].Name);
      setUserId(data[0].ID);

      console.log("suserId,userName", userId, userName);
    } catch (error) {
      console.log("Error while fetching entry details by id", error);
    }
  };

  const editEntry = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.BASE_URL}/api/v1/editEntry/${userId}`,
        { Name: userName }
      );

      console.log("data after updated", data);

      if (data.success) {
        showAllEntries();
        toast.success("Entry updated successfully.");
      }
    } catch (error) {
      console.log("Error while editing an entry", error);
      toast.error("Failed to edit entry.Please try again...");
    }
    setEditMode(false);
    setUserName("");
    setUserId("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchMode(true);
    try {
      const { data } = await axios.get(
        `${process.env.BASE_URL}/searchEntries/${searchUser}`
      );

      console.log("serach", data.result);
      setSearchList(data.result);

      // setSearchUser("");
    } catch (error) {
      console.log("Error while fetching your search results");
    }
  };

  const deleteHandler = (id) => {
    deleteEntry(id);
    showAllEntries();
  };
  const editHandler = (id) => {
    setEditMode(true);
    getEntryById(id);
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    addEntry();
    showAllEntries();
  };

  const handleOnchange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <>
      <Header />

      <div className="input-conatiner">
        <form onSubmit={editMode ? editEntry : handleAddEntry}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              required
              name="userName"
              id="userName"
              placeholder="Enter your name:"
              value={userName}
              onChange={handleOnchange}
            />
            <button className="addBtn">
              {editMode ? "Save Changes" : "Add Entry"}
            </button>
          </div>
        </form>
      </div>
      <div className="table-container">
        <Table
          entries={entries}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      </div>

      <div className="input-conatiner">
        <form onSubmit={handleSearch}>
          <div>
            <label>Search By Name: </label>
            <input
              type="text"
              required
              name="searchUser"
              id="userName"
              placeholder="Enter name:"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <button className="addBtn">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="table-container" style={{"fontSize":"18px", "fontWeight":"bold"}}>
      {
        searchMode && <div>Search results for "{searchUser}"</div>
      }
      </div>
      <div className="table-container">
        
        {
          searchList && searchList.length>0?(
            <Table entries={searchList} editHandler={editHandler} deleteHandler={deleteHandler}/>
          ):(
            searchMode && <div>No results found.</div>
          )
        }
      </div>
    </>
  );
}

export default App;
