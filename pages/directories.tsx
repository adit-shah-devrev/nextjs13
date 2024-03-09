import React from "react";
import { revalidate } from "@module-federation/nextjs-mf/utils";
import dynamic from "next/dynamic";

const TicketsList = dynamic(
  () =>
    import("portal-shared-components/tickets-list").then(
      (mod) => mod.TicketsList
    ),
  {
    ssr: true,
  }
);

export async function getServerSideProps({ res, req }) {
  if (process.env.NODE_ENV === "development" && !req.url.includes("_next")) {
    await revalidate().then((shouldReload) => {
      if (shouldReload) {
        res.writeHead(302, { Location: req.url });
        res.end();
      }
    });
  } else {
    res?.on("finish", () => {
      revalidate();
    });
  }

  return {
    props: {},
  };
}

export default function Directories() {
  return (
    <div>
      directories <TicketsList name="Adit" />
    </div>
  );
}
