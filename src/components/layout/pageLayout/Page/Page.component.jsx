import React from "react";
import PageHeader from "./PageHeader/PageHeader.component";
import PageContent from "./PageContent/PageContent.component";

const Page = (props) => {
  const { children, pageprops } = props;

  return (
    <>
      <PageHeader
        title={pageprops.title}
        breadcrumbs={pageprops.breadcrumbs}
        widgets={pageprops.widgets.header}
      />
      <PageContent content={children} />
    </>
  );
};

export default Page;
