import React, { useEffect, useState } from "react";
import * as Keychain from "react-native-keychain";

const ProtectedRoute = ({ children, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();

                if (credentials) {
                    setIsAuthenticated(true);
                } else {
                    navigation.replace("Login");
                }
            } catch (error) {
                console.log("Auth Error:", error);
                navigation.replace("Login");
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;