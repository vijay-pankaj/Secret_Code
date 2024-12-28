import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const passwordRef = useRef();
  const ref =useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  // Fetch passwords from the server
  const getPassword = async () => {
    try {
      const req = await fetch("http://localhost:3000/");
      if (!req.ok) throw new Error("Failed to fetch passwords");
      const passwords = await req.json();
      setPasswordArray(passwords);
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    getPassword();
  }, []);

  //copy text
  const copyText =(text)=>{
    navigator.clipboard.writeText(text);
  }

//show passoword
const showPassword = () => {
  if (passwordRef.current.type === "password") {
    passwordRef.current.type = "text";
    ref.current.src = "eye.png";
  } else {
    passwordRef.current.type = "password";
    ref.current.src = "closeEyes.png";
  }
};

  // Save password to server
  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("All fields are required!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    const newPassword = { ...form, id: uuidv4() };
    try {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      if (!res.ok) throw new Error("Failed to save password");

      setPasswordArray((prev) => [...prev, newPassword]);
      toast.success("Password saved successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
      });

      setForm({ site: "", username: "", password: "" });

    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
 

  // Delete password
  const deletePassword = async (id) => {
    if (confirm("Do you really want to delete the password?")) {
      await fetch(`http://localhost:3000/${id}`, { method: "DELETE" });
      toast.info("Password deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark",
      });
      getPassword();
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setForm(passwordToEdit);
      setPasswordArray((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full bg-gradient-to-r from-green-900 to-green-700 text-white p-5">
        <ToastContainer />
        <div className="text-4xl font-bold text-center text-orange-700 p-10">
          Secret
          <span className="text-black">&lt;</span>
          <span className="text-black">Codes/&gt;</span>
        </div>

        <p className="text-green-500 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="p-5 flex flex-col text-white gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL/name"
            className="rounded-full bg-black border border-red-600 w-full px-4 py-2"
            type="text"
            name="site"
          />
          <div className="flex w-full gap-6">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full bg-black border border-red-600 w-full px-4 py-2"
              type="text"
              name="username"
            />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full bg-black border border-red-600 w-full px-4 py-2"
                type="password"
                name="password"
              />
              <span
              className="absolute right-1 cursor-pointer py-2 w-5" onClick={showPassword}>
                <img 
                ref={ref}
                src="closeEyes.png" 
                alt="close eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-black hover:bg-green-600 rounded-full border border-red-600 px-6 py-2 font-bold"
          >
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="animate-text bg-gradient-to-r from-green-500 via-red-500 to-green-500 bg-clip-text text-transparent text-3xl font-black text-center p-6">
            Your Passwords
          </h2>
          {Array.isArray(passwordArray) && passwordArray.length === 0 ? (
            <div className="text-center py-9 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black">
              No Passwords To Show
            </div>
          ) : (
            <table className="text-white mx-auto w-3/4 mt-6 bg-black bg-opacity-50 rounded-lg">
              <thead>
                <tr className="text-green-500">
                  <th className="px-4 py-2">Website URL</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Password</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(passwordArray) &&
                  passwordArray.map((item) => (
                    <tr key={item.id} className="text-center border-b border-gray-700">
                      <td className="px-4 py-2">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {item.site}
                        </a>
                        <div className="w-5 cursor-pointer hover:scale-125" onClick={()=>copyText(item.site)}>
                        <img 
                        style={{marginTop:"-10px",padding:"2px"}}
                        src="copy.png" alt="" />
                        </div>
                      </td>
                      <td className="px-4 py-2">{item.username}</td>
                      <td className="px-4 py-2">{"*".repeat(item.password.length)}</td>
                      <td className="px-4 py-2 flex gap-4 justify-center">
                        <div
                          onClick={() => editPassword(item.id)}
                          className="cursor-pointer"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </div>
                        <div
                          onClick={() => deletePassword(item.id)}
                          className="cursor-pointer"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager;
