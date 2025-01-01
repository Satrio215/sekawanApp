export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/asset/logo.png"
            alt="Logo"
            className="w-12 h-12"  // Adjust these classes as necessary for styling
        />
    );
}
