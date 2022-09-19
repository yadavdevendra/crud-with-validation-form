import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [companyname, setCompanyname] = useState("");
  const [isAddButton, setIsAddButton] = useState(true);
  const [show, setShow] = useState(false);
  const [searchdata, setSearchdata] = useState([]);
  // Edite
  const [emailerror, setEmailerror] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [nameerror, setNameerror] = useState(true);
  const [usernameerror, setUsernameerror] = useState(true);
  const [companynameerror, setCompanynameerror] = useState(true);
  // const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((resp) => resp.json())
      .then((data) => {
        const newdata1 = data.map((item) => {
          const ph = phonemodify(item.phone);
          return { ...item, phone: ph };
        });
        console.log(data);
        setData(newdata1);
        setSearchdata(newdata1);
      });
  }, []);

  const handlename = (e) => {
    const { value } = e.target;
    let nameerror = "[^s]";
    if (!value.match(nameerror)) {
      // console.log("Error , Name:");
      setNameerror("please fill this field");
    } else {
      setNameerror("");
    }
    setName(value);
  };
  const handleusername = (e) => {
    const { value } = e.target;
    let usernameerror = "[^s]";
    if (!value.match(usernameerror)) {
      // console.log("Error , Name:");
      setUsernameerror("please fill this field ");
    } else {
      setUsernameerror("");
    }
    setUserName(value);
  };
  const handlephone = (e) => {
    const { value } = e.target;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!value.match(phoneno)) {
      // console.log("Error , Name:");
      setPhoneError("please fill this field");
    } else {
      setPhoneError("");
    }
    setPhone(value);
  };
  const handleemail = (e) => {
    const { value } = e.target;
    let emailerr = /^[^s@]/;
    if (!value.match(emailerr)) {
      // console.log("Error , Name:");
      setEmailerror("email do not start with @");
    } else {
      setEmailerror("");
    }
    setEmail(value);
  };
  const handlecompanyname = (e) => {
    const { value } = e.target;
    let companynameerror = "[^s]";
    if (!value.match(companynameerror)) {
      // console.log("Error , Name:");
      setCompanynameerror("please fill this field and not allow space");
    } else {
      setCompanynameerror("");
    }
    setCompanyname(value);
  };

  // validation all field
  function namevalidation() {
    let nameerror = "[^s]";
    if (name.match(nameerror)) {
      setNameerror("");
      return true;
    } else {
      setNameerror("please fill this field");
      return false;
    }
  }
  function usernamevalidation() {
    let usernameerror = "[^s]";
    if (username.match(usernameerror)) {
      setUsernameerror("");
      return true;
    } else {
      setUsernameerror("please fill this field");
      return false;
    }
  }
  function emailvalidation() {
    let emailerr = /^[^s@]+@[^s@]+\.[^s@]+$/;
    if (email.match(emailerr)) {
      setEmailerror("");
      return true;
    }
    if (email === "") {
      setEmailerror("don't empty email inpute");
      return true;
    }
    if (!email.includes("@")) {
      setEmailerror("email included with @");
      return true;
    }
    if (email[0] === "@") {
      setEmailerror("do not start with @");
      return true;
    }

    if (!email.split("@")[1].includes(".")) {
      setEmailerror("must have dot . com,in");
      return true;
    }
    if (email.split("@")[1][0] === ".") {
      setEmailerror("after @ type gmail");
      return true;
    } else {
      setEmailerror("don't empty email inpute");
    }
    return false;
  }

  function phonevalidation() {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(phoneno)) {
      setPhoneError("");
      return true;
    } else {
      setPhoneError("please take 10 digit value");
      return false;
    }
  }
  function companynamevalidation() {
    let companynameerror = "[^s]";
    if (companyname.match(companynameerror)) {
      setCompanynameerror("");
      return true;
    } else {
      setCompanynameerror("please fill this field");
      return false;
    }
  }
  const Add = (e) => {
    e.preventDefault();
    // setDisabled(!disabled);
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

    if (
      namevalidation() &&
      usernamevalidation() &&
      emailvalidation() &&
      phonevalidation() &&
      companynamevalidation()
    ) {
      setData([...data, newData]);
      setName("");
      setUserName("");
      setPhone("");
      setEmail("");
      setCompanyname("");
      setShow(!show);
    }
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
    setShow(true);
  }
  function handleEdite(e) {
    e.preventDefault();

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
    if (
      namevalidation() &&
      usernamevalidation() &&
      emailvalidation() &&
      phonevalidation() &&
      companynamevalidation()
    ) {
      setData(tmp);
      setName("");
      setUserName("");
      setPhone("");
      setEmail("");
      setCompanyname("");
      setShow(!show);
    }
  }
  function handleFshow() {
    setShow(true);
    setName("");
    setUserName("");
    setPhone("");
    setEmail("");
    setCompanyname("");
    setIsAddButton(true);
  }
  const Search = (value) => {
    if (value == "") {
      setData(searchdata);
      return;
    }

    const searchedItem = data?.filter((item) => {
      if (item.username !== null && item.email !== null) {
        return item.username.toLowerCase().indexOf(value.toLowerCase()) == 0
          ? true
          : false;
      } else return false;
    });
    setData(searchedItem);
  };
  function phonemodify(phone) {
    phone.slice(0, 13);
    var val = phone
      .split(" ")[0]
      .split(/[\.\s\(\)-]/)
      .join("");
    var val1 = val.slice(0, 10);
    return val1;
  }

  return (
    <>
      <div className="container">
        <h1>Form Handling With Validations</h1>

        {show && (
          <form className="form">
            <label>
              Name:
              <input
                type="text"
                id="name"
                onChange={handlename}
                value={name}
                // disabled={disabled}
              />
            </label>
            <span>{nameerror}</span>
            <label>
              UserName:
              <input
                type="text"
                id="username"
                onChange={handleusername}
                value={username}
                // disabled={disabled}
              />
            </label>
            <span>{usernameerror}</span>
            <label>
              Email:{" "}
              <input
                type="text"
                id="email"
                onChange={handleemail}
                value={email}
                // disabled={disabled}
              />
            </label>
            <span>{emailerror}</span>
            <label>
              Phone:
              <input
                type="text"
                id="phone"
                onChange={handlephone}
                value={phone}
                // disabled={disabled}
              />
            </label>
            <span>{phoneError}</span>
            <label>
              Company Name:
              <input
                type="text"
                id="companyname"
                onChange={handlecompanyname}
                value={companyname}
                // disabled={disabled}
              />
            </label>
            <span>{companynameerror}</span>
            {isAddButton && (
              <button
                style={{ margin: 20, backgroundColor: "gray" }}
                onClick={Add}
              >
                Add User Details
              </button>
            )}
            {!isAddButton && (
              <button
                style={{ margin: 20, backgroundColor: "skyblue" }}
                onClick={handleEdite}
              >
                Edit User Details
              </button>
            )}
          </form>
        )}
        <div className="searchbar">
          <input
            className="search"
            type="search"
            placeholder="Search...."
            onChange={(e) => {
              Search(e.target.value);
            }}
          />
          <button className="add" onClick={handleFshow}>
            Add user
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Id </th>
              <th>Name</th>
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
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.phone}</td>
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
