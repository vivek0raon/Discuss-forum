"use server";

import { redirect } from "next/navigation";

export const search = async (FormData: FormData) => {
  const term = FormData.get("term");

  if (typeof term !== "string" || !term) {
    redirect("/");
  }
  redirect(`/search?term=${term}`);
};
