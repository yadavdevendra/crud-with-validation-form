import React, { useState, useEffect } from "react";
import { Form } from "./components/Form";
// import { data } from "./components/Data";
const App = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [id, setId] = useState([]);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyname, setCompanyname] = useState("");
  // const [newData, setNewData] = useState({
  //   id: "",
  //   username: "",
  //   phoneNumber: "",
  //   email: "",
  //   companyName: "",
  // });
console.log(name,username);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const handlename = (e) => {
    const { id, value } = e.target;
    setName(value);
    console.log(value);
  };
  const handleusername = (e) => {
    const { id, value } = e.target;
    setUserName(value);
    console.log(value);
  };
  const handlephone = (e) => {
    const { id, value } = e.target;
    setPhone(value);
    console.log(value);
  };
  const handleemail = (e) => {
    const { id, value } = e.target;
    setEmail(value);
    console.log(value);
  };
  const handlecompanyname = (e) => {
    const { id, value } = e.target;
    setCompanyname(value);
    console.log(value);
  };

  const Add = (e) => {
    e.preventDefault();
    // setData([...data, { ...newData, id: Math.random() }]); // for giving the new data some random id
const max = 50
// if(max>10){
//   return max
// }
    const newData = {
      // for enptying the form
      id: Math.floor(Math.random() * max),
      name,
      username,
      phone,
      email,
      company: { name: companyname },
    };
    if (true){
      return false
    }else{
    setData([...data, newData ]);
    }
    console.log("data ",data.id,newData.id);
  };
  return (
    <>
      <div className="container">
        <div className="">
          <form className="form">
            <h1>Form Handling With Validations</h1>
            <label>
              Name:
              <input type="text" id="name" onChange={handlename} value={name} />
            </label>
            <label>
              <input type="text" id="username"onChange={handleusername}value={username}/>
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
              Phone
              <input
                type="text"
                id="phone"
                onChange={handlephone}
                value={phone}
              />
            </label>
            <label>
              Company Name
              <input
                type="text"
                id="companyname"
                onChange={handlecompanyname}
                value={companyname}
              />
            </label>
            <button onClick={Add}>Add User Deatail</button>
            <table className="table">
              <thead>
                <tr>
                  <th id="tr">Id </th>
                  <th id="tr">User Name</th>
                  <th id="tr">Phone Number</th>
                  <th id="tr">Email</th>
                  <th id="tr">Company Name</th>
                  <th id="tr">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.username}</td>
                      <td>{data.phone}</td>
                      <td>{data.email}</td>
                      <td>{data.company.name}</td>
                      <td className="action">
                        <button className="edite">Edite</button>
                        <button className="delete">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};
export default App;
