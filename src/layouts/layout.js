import Navbar from '../components/navbar.js';

export default function Layout({ children }) {
  return <div>
    <Navbar />
    {children}
  </div>;
}