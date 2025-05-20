import { STUDY_MATERIAL_TABLE } from "@/configs/schema"
import { db } from "@/configs/db"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function POST(req){

    const {createdBy}=await req.json()
    const result=await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.createdBy,createdBy));
    return NextResponse.json({result:result})
}