import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent, requiredUserId) => {
    return (props) => {
        const Router = useRouter();
        const [authorized, setAuthorized] = useState(false);

        useEffect(() => {
            const auth = getAuth();
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                        // Check if the logged-in user is the required user
                    if (user.uid === requiredUserId) {
                        setAuthorized(true);
                    } else {
                        // Redirect them to home page or login
                        Router.push('/login');
                    }
                } else {
                    // Not signed in, redirect to login
                    Router.push('/login');
                }
            });

            return () => unsubscribe();  // Clean up subscription
        }, [Router, requiredUserId]);

        // Show the component only when authorized
        if (!authorized) {
            return null; // or a loader component
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;