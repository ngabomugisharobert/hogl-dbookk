// utils/withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        console.log("withAuth")
        const router = useRouter();
        var isAuthenticated = false;
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('email');
            if (token && (token !== 'undefined')) {
                isAuthenticated = true;
            }

            else {
                console.log("not authenticated")
                isAuthenticated = false;
            }
        }
        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/');
            }
        }, [router]);

        // Render the protected component if the user is authenticated
        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return Wrapper;
};

export default withAuth;
