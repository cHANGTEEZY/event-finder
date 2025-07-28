import pool from "../../config/db.ts";
import { Request, Response } from "express";

interface UserCreateRequest {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

export const createUser = async (
  req: Request<{}, {}, UserCreateRequest>,
  res: Response
) => {
  const { user_id, username, email, first_name, last_name } = req.body;

  console.log("Userid is ", user_id);

  try {
    const createUserQuery = `INSERT INTO user_details (user_id,username,email,first_name,last_name)
        VALUES ($1,$2,$3,$4,$5)
      `;

    const createUser = await pool.query(createUserQuery, [
      user_id,
      username,
      email,
      first_name,
      last_name,
    ]);

    if (createUser.rowCount === 0) {
      throw new Error("Failed to create user ");
    }

    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating user ${error instanceof Error ? error.message : "Unknown error"}`,
    });

    throw new Error(
      `Error creating user: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
