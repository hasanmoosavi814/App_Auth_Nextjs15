export interface ICardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
}

export interface IHeaderProps {
  label: string;
}

export interface IBackBtnProps {
  label: string;
  href: string;
}
