import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const withAuthAdmin = (WrappedComponent, requiredUserId) => {
    return (props) => {
        const Router = useRouter();
        const [authorized, setAuthorized] = useState(false);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    if (user.uid === requiredUserId) {
                        setAuthorized(true);
                    } else {
                        Router.push('/');
                    }
                } else {
                    Router.push('/sign-in');
                }
            });

            return () => unsubscribe();
        }, [Router, requiredUserId]);

        if (!authorized) {
            return null; 
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuthAdmin;