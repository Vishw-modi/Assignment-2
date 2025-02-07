import { useEffect, useState } from "react";
import axios from "axios";
document.title = "User Cards";
function UserCard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=9"
        );
        setUsers(response.data.results);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-800 text-lg">
        Loading user data...
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-b from-blue-100 via-white to-blue-50 min-h-screen p-8">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
        User Profiles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
          >
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-36 h-36 rounded-full object-cover shadow-md mb-4"
            />
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-700">
                {user.name.first} {user.name.last}
              </p>
              <p className="text-gray-500 mt-1">Gender: {user.gender}</p>
              <p className="text-gray-500 mt-1">Phone: {user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCard;
