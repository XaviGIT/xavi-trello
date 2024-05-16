import { OrgControl } from "./_components/org-control";

interface Props {
  children: React.ReactNode;
}

const OrganizationIdLayout = ({ children }: Props) => {
  return <>
    <OrgControl />
    {children}
  </>;
};

export default OrganizationIdLayout;
