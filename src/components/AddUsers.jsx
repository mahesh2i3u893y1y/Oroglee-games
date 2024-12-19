import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../Utilities/userSlice"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { updateLevel } from "../Utilities/gamesDataSlice";

const AddUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);

  const [formVisible, setFormVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name,
      age: parseInt(age, 10),
      profilePic: null,
    };
    dispatch(addUser(newUser));
    setFormVisible(false);
    setName("");
    setAge("");
  };

  const handleEditUser = () => {
    if (selectedUser) {
      dispatch(
        editUser({
          id: selectedUser.id,
          updatedUser: { name, age: parseInt(age, 10), profilePic },
        })
      );
      setEditVisible(false);
      setSelectedUser(null);
      setName("");
      setAge("");
      setProfilePic(null);
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

    // Navigate to the home page with the user details
    navigate("/home", { state: { user } });
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5">
      <h1 className="text-xl md:text-3xl text-purple-600 font-semibold">Who's Playing</h1>
      <div
        className="rounded-[50%] text-lg md:text-3xl px-3 md:px-4 py-2 cursor-pointer font-bold bg-black text-white"
        onClick={() => setFormVisible(true)}
      >
        +
      </div>

      <div className="flex flex-wrap gap-3 md:gap-5 mt-5 justify-center">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative group border border-gray-300 rounded-[50%] cursor-pointer text-lg md:text-5xl font-bold bg-purple-500 w-20 h-20 md:w-32 md:h-32 flex justify-center items-center"
            onClick={() => handleUserClick(user)}
          >
            {/* Profile Image or Initial */}
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              user.name[0].toUpperCase()
            )}

            {/* Edit Button */}
            <button
              className="edit-btn absolute hidden group-hover:flex items-center justify-center bg-gray-800 text-white p-2 rounded-full text-xs md:text-sm w-8 h-8 md:w-10 md:h-10"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click event
                setEditVisible(true);
                setSelectedUser(user);
                setName(user.name);
                setAge(user.age);
                setProfilePic(user.profilePic);
              }}
            >
              ✏️
            </button>
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
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-2 rounded w-full mb-3"
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
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
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
    </div>
  );
};

export default AddUsers;
