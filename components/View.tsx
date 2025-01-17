import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEW_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEW_QUERY, { id });

  after(async () =>
    writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -rght-2">
        <Ping />
      </div>

      <p className="view-text mb-3">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
