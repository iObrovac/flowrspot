export interface INavigationProps {
  hide?: boolean;
  closeMobile?: () => void;
  openLogin: () => void;
  openNewAcc: () => void;
  openLogoutModal?: () => void;
}
