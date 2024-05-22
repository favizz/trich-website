import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const withAuth = (Component) => {
    return (props) => {
        const Router = useRouter();
        const [authorized, setAuthorized] = useState(false);

        useEffect(() => {
            const auth = getAuth();
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setAuthorized(true);
                } else {
                    // Not signed in, redirect to login
                    Router.push('/sign-in');
                }
            });

            return () => unsubscribe();  // Clean up subscription
        }, [Router]);

        // Show the component only when authorized
        if (!authorized) {
            return null; // or a loader component
        }

        return <Component {...props} />;
    };
};

export default withAuth;