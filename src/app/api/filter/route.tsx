import { NextResponse, NextRequest } from "next/server";
import * as Realm from "realm-web";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const prior = searchParams.getAll("prior").map((str) => parseInt(str, 10));
  const due = searchParams.get("due");
  const sort = searchParams.getAll("sort").map((str) => parseInt(str, 10));

  const pr = prior.length > 0 ? prior : [];
  const du = due !== null ? due : "";



  const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const getFilters = await user.functions.getFilter(pr, du, sort);
    return NextResponse.json({ tasks: getFilters }, { status: 200 });
  } catch (err) {
    console.error("Failed to log in", err);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }

  return NextResponse.json({ tasks: due }, { status: 200 });
};

// export async function GET(req){
//   const {searchParams} = new URL(req.url);
//   const param = searchParams.get("/*Your param key here*/");
//   console.log(param)
// }
// To get req body

// export async function POST(req){
//   const body = await req.json()
//   console.log(body)
// }
