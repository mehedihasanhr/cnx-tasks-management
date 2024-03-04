import { db } from "@/lib/db";

export async function GET() {
  // get user profile here..
  try {
    const users = await db.profile.findMany();

    if (!users) {
      Response.json({ message: "Users not founds" }, { status: 404 });
    }

    return Response.json(
      { users, message: "Users fetch successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
