import { NextResponse, NextRequest } from 'next/server';
import * as Realm from "realm-web";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");


  const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const getTask = await user.functions.getTask(id);
    return NextResponse.json({ tasks: getTask }, { status: 200 });
  } catch (err) {
    console.error("Failed to log in", err);
    return NextResponse.json({ error: "Failed to search tasks" }, { status: 500 });
  }
  return NextResponse.json({ tasks: id }, { status: 200 });

};