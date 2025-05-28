import React, {createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setUser(null);
            return;
        }

        async function fetchUser() {
            try {
                const response = await fetch('http://localhost:8000/api/v1/users/me/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await response.json();
                setUser(data);  // data має містити `id`, `email`, `role` тощо
            } catch (err) {
                console.error("Failed to fetch user", err);
                setUser(null);
            }
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
