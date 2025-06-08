import Image from "next/image";

function Footer() {
    return (
        <footer className="h-auto mb-4 flex flex-col md:flex-row justify-between items-center py-4 px-6">
            <div className="flex md:flex-row items-center justify-center text-center">
                <Image
                    src="/bibektimilsina_logo.jpg"
                    width={60}
                    height={60}
                    alt='logo'
                    className="rounded-full mb-2 md:mb-0 md:mr-4"
                />
                <h1 className=" text-sm md:text-md text-gray-700">
                    Thanks for scrolling,<span className="text-xs md:text-sm text-gray-500"> that's all folks.</span>
                </h1>
            </div>
            <p className="text-center text-xs md:text-base mt-4 md:mt-0 text-gray-600">
                &copy; {new Date().getFullYear()} Bibek Timilsina. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
