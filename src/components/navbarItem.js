import Link from 'next/link';

export default function NavbarItem({text, href}) {
    return (
        <Link href={href} className="text-white font-medium hover:text-gray-400 mr-6">
        {text}
        </Link>
    );
}
