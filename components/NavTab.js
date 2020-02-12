import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavTab = ({ to, children }) => {
  const router = useRouter();  
  return (
    <li className={to == router.pathname ? "active" : ""}>
      <Link href={to}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export default NavTab;
