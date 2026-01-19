import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full flex flex-col items-center justify-center py-2 opacity-40 mt-4 text-center">
            <p className="text-[10px] font-normal tracking-wide">
                © {new Date().getFullYear()} Aether App
            </p>
        </footer>
    );
};

export default Footer;
