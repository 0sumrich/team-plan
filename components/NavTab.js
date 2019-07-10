import React from 'react';
import Link from "next/link";
import {withRouter} from 'next/router'

const NavTab = ({ to, router, children }) => {
return (
  <li className={to==router.pathname ? "active" : ""}>
    <Link href={to}>
      <a>{children}</a>
    </Link>
  </li>
)};

export default withRouter(NavTab);