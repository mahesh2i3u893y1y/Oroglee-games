import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser, markAsPlayed } from "../Utilities/userSlice"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { updateLevel } from "../Utilities/gamesDataSlice";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import { MdNotificationImportant } from "react-icons/md";
const AddUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.user.users);

  const [formVisible, setFormVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [model, setModel] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nickName, setNickName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const resetForm = () => {
    setName("");
    setNickName("");
    setAge("");
    setProfilePic(null);
  };

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name,
      nickName,
      age: parseInt(age, 10),
      profilePic,
    };
    dispatch(addUser(newUser));
    setFormVisible(false);
    resetForm();
    setModel(!model)
  };

  const handleEditUser = () => {
    if (selectedUser) {
      dispatch(
        editUser({
          id: selectedUser.id,
          updatedUser: { name, nickName, age: parseInt(age, 10), profilePic },
        })
      );
      setEditVisible(false);
      setSelectedUser(null);
      resetForm();
      setModel(!model)
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUserClick = (user) => {
    const userAge = parseInt(user.age, 10);

    // Determine level based on age
    let level = "easy";
    if (userAge > 5 && userAge <= 8) {
      level = "medium";
    } else if (userAge > 8) {
      level = "hard";
    }

    // Dispatch the level change
    dispatch(updateLevel(level));

    // Redirect logic based on whether the user has played

    if (!user.hasPlayed) {
      dispatch(markAsPlayed({ id: user.id }));
      navigate("/about-game", { state: { user } });
    } else {
      navigate("/home", { state: { user } });
    }

  };


  const handleToggle = () => {
    setModel(!model)
  }


  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5">
      <h1 className="text-xl md:text-3xl text-purple-600 font-semibold">Who is Playing</h1>
      <div
        className="rounded-[50%]  md:text-3xl px-3 md:px-4 py-3 cursor-pointer font-bold bg-gray-100 text-black text-2xl"
        onClick={() => {
          resetForm();
          setFormVisible(true);
        }}
      >
        <IoIosPersonAdd/>
      </div>
      <div className="flex flex-wrap gap-3 md:gap-5 mt-5 justify-center">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center">
            {/* Profile Container */}
            <div
              className="relative group border border-gray-300 rounded-[50%] cursor-pointer text-lg md:text-5xl font-bold bg-purple-500 w-20 h-20 md:w-32 md:h-32 flex justify-center items-center"
              onClick={() => handleUserClick(user)}
            >
              {/* Profile Image */}
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <span className="text-white">{user.name[0].toUpperCase()}</span>
              )}

              {/* Edit Button */}
              <button
                className="edit-btn absolute hidden  group-hover:flex items-center justify-center bg-gray-600 text-white p-2 rounded-full text-xs md:text-sm w-8 h-8 md:w-10 md:h-10"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click event
                  setEditVisible(true);
                  setSelectedUser(user);
                  setName(user.name);
                  setNickName(user.nickName);
                  setAge(user.age);
                  setProfilePic(user.profilePic);
                }}
              >
                <MdEdit />
              </button>
            </div>

            {/* User Details */}
            <div className="text-center mt-2">
              <p className="text-sm md:text-lg font-bold text-gray-800">{user.name}</p>
              <p className="text-xs md:text-sm text-gray-500">{user.nickName}</p>
            </div>
          </div>
        ))}
      </div>


      {/* Add User Modal */}
      {formVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg md:text-2xl font-semibold mb-4">Add User</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="text"
              placeholder="Nickname"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <p className="my-2 text-gray-500 font-semibold">select your profile</p>
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="w-full mb-3"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setFormVisible(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-purple-600 text-white p-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editVisible && selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg md:text-2xl font-semibold mb-4">Edit Profile</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="text"
              placeholder="Nickname"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <p className="my-2 text-gray-500 font-semibold">Change Profile</p>
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="w-full mb-3"
            />
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border mx-auto mb-3"
              />
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditVisible(false);
                  setSelectedUser(null);
                }}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="bg-purple-600 text-white p-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {
        model && (
          <div className="bg-blue-100 rounded-md p-5 shadow-lg absolute w-[80%] md:w-[30%] flex flex-col justify-center items-center top-[38%] zoom-animations">
            <button
              className="self-end text-2xl p-1 rounded-full font-semibold hover:bg-gray-500"
              onClick={handleToggle}
            >
              <IoClose />
            </button>
            <h1 className="text-red-800 font-semibold text-2xl py-2 flex justify-center items-center"><MdNotificationImportant className="text-red-600"/> Note</h1>
            <p className="font-semibold text-green-500 py-2">
              👍👍 Profile Pic and Nickname will be display once the verification is done 👍👍
            </p>
          </div>
        )
      }

    </div>
  );
};

export default AddUsers;









// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddUsers = () => {
//   const navigate = useNavigate();

//   // Backend URL
//   const BASE_URL = "https://dummyapi.com/users"; // Replace with your actual URL

//   const [users, setUsers] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [editVisible, setEditVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [profilePic, setProfilePic] = useState(null);

//   // GET Users from Backend
//   const getPlayersData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}`);
//       if (!response.ok) throw new Error("Something went wrong!!");
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching players:", error);
//     }
//   };

//   // POST: Add New User
//   const addPlayerToBackend = async (user) => {
//     try {
//       const response = await fetch(`${BASE_URL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       if (!response.ok) throw new Error("Failed to add user");
//       const newUser = await response.json();
//       setUsers((prev) => [...prev, newUser]);
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   // PUT: Update User
//   const updatePlayerInBackend = async (userId, updatedUser) => {
//     try {
//       const response = await fetch(`${BASE_URL}/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedUser),
//       });
//       if (!response.ok) throw new Error("Failed to update user");
//       const updatedUserData = await response.json();
//       setUsers((prev) =>
//         prev.map((user) => (user.id === userId ? updatedUserData : user))
//       );
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   // DELETE: Remove User
//   const deletePlayerFromBackend = async (userId) => {
//     try {
//       const response = await fetch(`${BASE_URL}/${userId}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete user");
//       setUsers((prev) => prev.filter((user) => user.id !== userId));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   useEffect(() => {
//     getPlayersData();
//   }, []);

//   const handleAddUser = () => {
//     const newUser = {
//       id: Date.now(),
//       name,
//       age: parseInt(age, 10),
//       profilePic: null,
//     };
//     addPlayerToBackend(newUser);
//     setFormVisible(false);
//     setName("");
//     setAge("");
//   };

//   const handleEditUser = () => {
//     if (selectedUser) {
//       const updatedUser = { name, age: parseInt(age, 10), profilePic };
//       updatePlayerInBackend(selectedUser.id, updatedUser);
//       setEditVisible(false);
//       setSelectedUser(null);
//       setName("");
//       setAge("");
//       setProfilePic(null);
//     }
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setProfilePic(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUserClick = (user) => {
//     const userAge = parseInt(user.age, 10);

//     // Determine level based on age
//     let level = "easy";
//     if (userAge > 5 && userAge <= 8) {
//       level = "medium";
//     } else if (userAge > 8) {
//       level = "hard";
//     }

//     // Navigate to the home page with the user details
//     navigate("/home", { state: { user, level } });
//   };

//   return (
//     <div className="flex flex-col justify-center items-center p-5 gap-5">
//       <h1 className="text-xl md:text-3xl text-purple-600 font-semibold">Who is Playing</h1>
//       <div
//         className="rounded-[50%] text-lg md:text-3xl px-3 md:px-4 py-2 cursor-pointer font-bold bg-black text-white"
//         onClick={() => setFormVisible(true)}
//       >
//         +
//       </div>

//       <div className="flex flex-wrap gap-3 md:gap-5 mt-5 justify-center">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="relative group border border-gray-300 rounded-[50%] cursor-pointer text-lg md:text-5xl font-bold bg-purple-500 w-20 h-20 md:w-32 md:h-32 flex justify-center items-center"
//             onClick={() => handleUserClick(user)}
//           >
//             {/* Profile Image or Initial */}
//             {user.profilePic ? (
//               <img
//                 src={user.profilePic}
//                 alt="Profile"
//                 className="rounded-full w-full h-full object-cover"
//               />
//             ) : (
//               user.name[0].toUpperCase()
//             )}

//             {/* Edit Button */}
//             <button
//               className="edit-btn absolute hidden group-hover:flex items-center justify-center bg-gray-800 text-white p-2 rounded-full text-xs md:text-sm w-8 h-8 md:w-10 md:h-10"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent parent click event
//                 setEditVisible(true);
//                 setSelectedUser(user);
//                 setName(user.name);
//                 setAge(user.age);
//                 setProfilePic(user.profilePic);
//               }}
//             >
//               ✏️
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Add User Modal */}
//       {formVisible && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-5">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-lg md:text-2xl font-semibold mb-4">Add User</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="number"
//               placeholder="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setFormVisible(false)}
//                 className="bg-gray-500 text-white p-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddUser}
//                 className="bg-purple-600 text-white p-2 rounded"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit User Modal */}
//       {editVisible && selectedUser && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-5">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-lg md:text-2xl font-semibold mb-4">Edit Profile</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="number"
//               placeholder="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="file"
//               onChange={handleProfilePicChange}
//               className="w-full mb-3"
//             />
//             {profilePic && (
//               <img
//                 src={profilePic}
//                 alt="Profile"
//                 className="w-24 h-24 md:w-32 md:h-32 rounded-full border mx-auto mb-3"
//               />
//             )}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setEditVisible(false);
//                   setSelectedUser(null);
//                 }}
//                 className="bg-gray-500 text-white p-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleEditUser}
//                 className="bg-purple-600 text-white p-2 rounded"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddUsers;
