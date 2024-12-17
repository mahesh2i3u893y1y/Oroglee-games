import { useState } from "react";

const AddGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      setGroups([...groups, { name: groupName, players: [] }]);
      setGroupName("");
    }
  };

  const handleAddPlayer = () => {
    if (playerName.trim() && selectedGroup !== null) {
      const updatedGroups = groups.map((group, index) => {
        if (index === selectedGroup) {
          return { ...group, players: [...group.players, playerName] };
        }
        return group;
      });
      setGroups(updatedGroups);
      setPlayerName("");
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl md:text-4xl text-purple-500 font-bold text-center p-4">Create your own group</h1>
      <div className="flex flex-col md:flex-row gap-5 p-5">
        {/* Left Section: Groups and Players */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Groups</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={handleCreateGroup}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>

          <ul className="space-y-3">
            {groups.map((group, index) => (
              <li
                key={index}
                className={`p-3 rounded cursor-pointer ${selectedGroup === index ? "bg-purple-200" : "bg-gray-200"
                  }`}
                onClick={() => setSelectedGroup(index)}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Players */}
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
          {selectedGroup !== null ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {groups[selectedGroup]?.name} Members
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter Player Name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 border p-2 rounded"
                />
                <button
                  onClick={handleAddPlayer}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>

              <ul className="space-y-3">
                {groups[selectedGroup].players.map((player, idx) => (
                  <li
                    key={idx}
                    className="p-2 bg-green-100 rounded border text-gray-800"
                  >
                    {player}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h2 className="text-lg text-gray-500">
              Select a group to view or add members.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
