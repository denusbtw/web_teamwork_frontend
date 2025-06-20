import React, {createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        async function fetchUser() {
            try {
                const response = await fetch('https://web-teamwork-backend.onrender.com/api/v1/users/me/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await response.json();
                console.log(data);
                setUser(data);  // data має містити `id`, `email`, `role` тощо
            } catch (err) {
                console.error("Failed to fetch user", err);
                setUser(null);
            } finally {
                setLoading(false);
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
