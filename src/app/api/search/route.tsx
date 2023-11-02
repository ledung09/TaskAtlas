import { NextResponse } from 'next/server';
import * as Realm from "realm-web";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") === null ? "" : searchParams.get("query");

  const prior = searchParams.getAll("prior").map((str) => parseInt(str, 10));
  const due = searchParams.get("due");
  const sort = searchParams.getAll("sort").map((str) => parseInt(str, 10));

  const pr = prior.length > 0 ? prior : [];
  const du = due !== null ? due : "";
  const sr = sort.length > 0 ? sort : [];

  const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const searchQuery = await user.functions.searchAutoComplete(query);
    const searchTasks = await user.functions.searchTasks(query, pr, du, sr);

    return NextResponse.json({ taskName: searchQuery, tasks: searchTasks }, { status: 200 });
  } catch (err) {
    console.error("Failed to log in", err);
    return NextResponse.json({ error: "Failed to search tasks" }, { status: 500 });
  }
};