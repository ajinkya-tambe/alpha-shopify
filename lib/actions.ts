"use server";

import { auth } from "@/auth";
import { parsedServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();
  
  const userId = session?.id;
  console.log("User's ID from action.ts: ", userId);
  if (!userId) {
  return parsedServerActionResponse({
    error: "User ID is missing or invalid",
    status: "ERROR",
  });
}

const authorDoc = await writeClient.fetch(
    `*[_type == "author" && id == $userId][0]{_id}`,
    { userId }
  );

  if (!authorDoc) {
    return parsedServerActionResponse({
      error: "Author not found",
      status: "ERROR",
    });
  }

  if (!session)
    return parsedServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: authorDoc._id,
      },
      views: 0,
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parsedServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parsedServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};