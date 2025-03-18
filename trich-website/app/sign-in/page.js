import ClientPage from "./PhoneComponents/ClientPage";

import DescBg from "@/public/homeAssets/DescBg.png";

const SignIn = () => {
    return (
        <main
            style={{ backgroundImage: `url(${DescBg.src})` }}
            className="w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        >
            <ClientPage />
        </main>
    );
};

export default SignIn;
