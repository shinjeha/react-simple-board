import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/about">
        <button>about</button>
      </Link>
      <Link to="/users">
        <button>users</button>
      </Link>
      <Link to="/postMain">
        <button>postMain</button>
      </Link>
    </header>
  );
}

export default Header;
