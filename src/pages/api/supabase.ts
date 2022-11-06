// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../libs/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { page } = req.query;
  const perPage = 151;
  const range =
    !page || page === "1"
      ? { from: 0, to: 150 }
      : { from: (Number(page) - 1) * perPage, to: Number(page) * perPage - 1 };

  const { data, error } = await supabase
    .from("wordlist")
    .select("*")
    .range(range.from, range.to);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
