import { routerPath } from 'common/config/router/router.path';
import { FooterBottom } from 'components/Footer/FooterBottom/FooterBottom';
import { FooterTop } from 'components/Footer/FooterTop/FooterTop';
import { Navbar } from 'components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

export default function AppLayout() {
  let location = useLocation();
  const isHomePage: boolean = location.pathname === routerPath.common.HOME;
  const isSearchPage: boolean = location.pathname === routerPath.app.SEARCH;
  const isLoginPage: boolean = location.pathname === routerPath.auth.LOGIN;
  const isSignInPage: boolean =
    location.pathname === routerPath.auth.USER_REGISTER;

  const renderFooter = () => {
    if (isHomePage || isSearchPage) {
      return (
        <>
          <FooterTop />
          <FooterBottom />
        </>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className={`${!isLoginPage && !isSignInPage && 'pt-14'}`}>
        <Outlet />
      </div>
      {renderFooter()}
    </div>
  );
}
