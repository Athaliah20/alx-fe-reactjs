import React from 'react';

function UserProfile() {
    return (
        <div className="user-profile bg-gray-100 p-4 sm:p-8 max-w-xs sm:max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img
                className="rounded-full w-24 h-24 sm:w-36 sm:h-36 mx-auto transition-transform duration-300 ease-in-out hover:scale-110"
                src="https://via.placeholder.com/150"
                alt="User"
            />
            <h1 className="text-lg sm:text-xl text-blue-800 my-4 font-bold hover:text-blue-500 transition-colors duration-300">
                John Doe
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
                Developer at Example Co. Loves to write code and explore new technologies.
            </p>
        </div>
    );
}

export default UserProfile;
