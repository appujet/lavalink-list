export default function Footer() {
    return (
        <div className="absolute left-0 w-full py-3 bg-opacity-90 backdrop-blur-[5px] bg-background/80 dark:bg-background/50 dark:bg-opacity-70 dark:border-gray-700 border-b-0 border-gray-700 flex justify-center items-center">
            <p className="font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.pink.400),theme(colors.pink.100),theme(colors.blue.300),theme(colors.green.400),theme(colors.blue.300),theme(colors.pink.100),theme(colors.pink.400))] bg-[length:200%_auto] animate-gradient">
                A project by Appu &copy; {new Date().getFullYear()}
            </p>
        </div>
    );
}
