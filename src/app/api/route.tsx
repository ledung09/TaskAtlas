import { NextResponse } from 'next/server';
import * as Realm from "realm-web";

export const GET = async () => {
  const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const getTasks = await user.functions.getTasks();
    return NextResponse.json({ tasks: getTasks }, { status: 200 });
  } catch (err) {
    console.error("Failed to log in", err);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json()
  const { name , due , prior, des } = body

  const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const getTasks = await user.functions.setDocument(name, due, prior, des);
    return NextResponse.json({ tasks: getTasks }, { status: 200 });
  } catch (err) {
    console.error("Failed to log in", err);
    return NextResponse.json({ error: "Failed to insert task" }, { status: 500 });
  }
}

export const PUT = async (req: Request) => {
  const body = await req.json()
  const { id, name, due, prior, des } = body

  const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const updateTask = await user.functions.updateTask(id, name, due, prior, des);
    return NextResponse.json({ tasks: updateTask }, { status: 200 });
  } catch (err) {
    console.error("Failed to log in", err);
    return NextResponse.json({ error: "Failed to insert task" }, { status: 500 });
  }
}


export const DELETE = async (req: Request) => {
  const body = await req.json()
  const { id } = body

  const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const deleteTask = await user.functions.deleteTask(id);
    return NextResponse.json({ tasks: deleteTask }, { status: 200 });
  } catch (err) {
    console.error("Failed to log in", err);
    return NextResponse.json({ error: "Failed to insert task" }, { status: 500 });
  } 
}

