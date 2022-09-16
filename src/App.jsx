import React, { useState, useEffect } from "react";
import { Form } from "./components/Form";
// import { data } from "./components/Data";

const App = () => {
  const [data, setData] = useState([]);
  // const [pdata, setPdata] = useState(false);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [companyname, setCompanyname] = useState("");
  const [isAddButton, setIsAddButton] = useState(true);
  const [ram, setRam] = useState(false);
  const [show, setShow] = useState(false);
  const [searchdata,setSearchdata] = useState([])
  const [error, setError] = useState([]);


  useEffect(() => {
    if (ram) return;
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setSearchdata(data)
      });
  }, []);

  const handlename = (e) => {
    const { value } = e.target;
    setName(value);
  };
  const handleusername = (e) => {
    const { value } = e.target;
    setUserName(value);
  };
  const handlephone = (e) => {
    const { value } = e.target;
    setPhone(value);
  };
  const handleemail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handlecompanyname = (e) => {
    const { value } = e.target;
    setCompanyname(value);
  };
   function validation(){
    if(name ==="" || name.length >3 && name.length <20){
      setError("please fill the box")
    }
   }

  const Add = (e) => {
    e.preventDefault();
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const id = randomInt(11, 50);
    const newData = {
      id,
      name,
      username,
      phone,
      email,
      company: { name: companyname },
    };
    setData([...data, newData]);
    setName("");
    setUserName("");
    setPhone("");
    setEmail("");
    setCompanyname("");
     validation()
  };
  function handleDelete(id) {
    const newdata = data.filter((item) => item.id !== id);
    setData(newdata);
  }
  function handleeditbutton(id) {
    const editedata = data.find((item) => item.id === id);
    setEditId(id);
    setName(editedata.name);
    setUserName(editedata.username);
    setPhone(editedata.phone);
    setEmail(editedata.email);
    setCompanyname(editedata.company.name);
    setIsAddButton(false);
    // setShow(true)
    setShow(!show);
  }
  function handleEdite(e) {
    e.preventDefault();
    // const filtdata = data.filter((item) => item.id !== editId);
    const editsaveData = {
      id: editId,
      name,
      username,
      phone,
      email,
      company: { name: companyname },
    };
    const tmp = [];
    data.forEach((item) => {
      if (item.id == editId) {
        tmp.push(editsaveData);
        return;
      }
      tmp.push(item);
    });
    setData(tmp);
    setEditId(null);
     setShow(!show);
  }
  function handleFshow() {
    setShow(!show);
  }
 const Search = (value) => {
  //  setSearch(value);
   if (value == "") {
     setData(searchdata);
     return;
   }

   const searchedItem = data?.filter((item) => {
     if (item.username !== null && item.email !== null) {
      //  return item.username.toLowerCase().indexOf(value) == -1 ? false : true;
      return item.username.indexOf(value) == -1 ? false : true;
     } else return false;
   });
   setData(searchedItem);
 }
 function phonemodify(phone) {
  //  console.log("modify phone", typeof phone); //retun type string
   phone.slice(0,13)
   var val = phone.split(" ")[0].split(/[\.\s\(\)-]/).join("");
   var val1 = val.slice(0,10)
    return val1
 }

  return (
    <>
      <div className="container">
        <h1>Form Handling With Validations</h1>
        <div className="searchbar">
          <input
            className="search"
            type="search"
            placeholder="Search...."
            onChange={(e) => {
              Search(e.target.value);
            }}
          />
          <button onClick={handleFshow}> Add user </button>
        </div>
        {show && (
          <form className="form">
            <label>
              Name:
              <input
                type="text"
                id="name"
                onChange={handlename}
                value={name}
                required
              />
              {name =='' ?<p>{error}</p>:false}
            </label>

            <label>
              UserName:
              <input
                type="text"
                id="username"
                onChange={handleusername}
                value={username}
              />
            </label>
            <label>
              Email:{" "}
              <input
                type="text"
                id="email"
                onChange={handleemail}
                value={email}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                id="phone"
                onChange={handlephone}
                value={phone}
              />
            </label>
            <label>
              Company Name:
              <input
                type="text"
                id="companyname"
                onChange={handlecompanyname}
                value={companyname}
              />
            </label>
            {isAddButton && (
              <button
                style={{ margin: 20, backgroundColor: "gray" }}
                onClick={Add}
              >
                Add User Deatail
              </button>
            )}
            {!isAddButton && (
              <button
                style={{ margin: 20, backgroundColor: "skyblue" }}
                onClick={handleEdite}
              >
                Edit User Deatail
              </button>
            )}
          </form>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Id </th>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.username}</td>
                  <td>{phonemodify(data.phone)}</td>
                  <td>{data.email}</td>
                  <td>{data.company.name}</td>
                  <td className="action">
                    <button
                      className="edite"
                      onClick={() => {
                        handleeditbutton(data.id);
                      }}
                    >
                      Edite
                    </button>
                    <button
                      className="delete"
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default App;
