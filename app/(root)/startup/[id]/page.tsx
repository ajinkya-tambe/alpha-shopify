/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdwonit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "../../../../components/View";

// import Image from "next/image";

export const experimental_ppr = true;
const md = markdwonit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container-for-startup-details !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        {/* following Image tags works too */}
        {/* <Image
          src={post.image}
          alt="Startup Picture"
          className="w-full h-auto rounded-xl"
          width={500}
          height={500}
          layout="responsive"
        /> */}

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            {/* <Link
              href={`/user/${post.author?.id || ""}`}
              className="flex gap-2 items-center mt-3"
            > */}
            <div className="flex gap-2 items-center mt-3">
              {post.author?.image ? (
                <Image
                  src={post.author.image}
                  alt="Avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
              ) : (
                <div className="rounded-full drop-shadow-lg w-16 h-16 bg-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}

              <div>
                <p className="text-20-medium">
                  {post.author?.name || "Anonymous"}
                </p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username || "unknown"}
                </p>
              </div>
              {/* </Link> */}
            </div>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No Details Provided!</p>
          )}
        </div>

        <hr className="divider" />

        {/* TODO: EDITOR SELECTED STARTUPS */}
      </section>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default Page;
