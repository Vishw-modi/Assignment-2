import { useEffect, useState } from "react";
import axios from "axios";

document.title = "User Cards";

function UserCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/?results=");
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 md:p-12 bg-gray-100 min-h-screen">
      {users.map((user, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center border rounded-2xl p-6 bg-white shadow-2xl transform transition duration-300 hover:shadow-3xl hover:scale-105"
        >
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-32 h-32 rounded-lg object-cover shadow-md"
          />
          <div className="mt-4 md:mt-0 md:ml-8 flex flex-col justify-between text-center md:text-left">
            <p className="text-xl font-bold text-gray-800">
              {user.name.first} {user.name.last}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Gender:</span> {user.gender}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCard;
