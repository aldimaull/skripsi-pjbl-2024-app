import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { projectId, code, userId } = req.body;
  const userInt = parseInt(userId, 10);

  try {
    const updatedProject = await db.tookProject.update({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userInt,
        },
      },
      data: { submission: code },
    });

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ success: false, error: "Failed to update project" });
  }
}
