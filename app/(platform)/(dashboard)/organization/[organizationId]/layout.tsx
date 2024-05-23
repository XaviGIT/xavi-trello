import { startCase } from "lodash";

import { OrgControl } from "./_components/org-control";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization")
  }
}

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
