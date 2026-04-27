import { NextResponse } from "next/server";
import { z } from "zod";
import { createPartnerApplication } from "@/lib/db";

const partnerApplicationSchema = z.object({
  fullName: z.string().min(1).max(200),
  phone: z.string().min(1).max(48),
  email: z.string().min(1).max(320).email(),
  networkSectors: z.array(z.string().max(100)).max(20),
  experience: z.string().max(5000).optional().default(""),
  whyGenezisi: z.string().min(1).max(5000),
  clientPlan: z.string().min(1).max(5000),
  resumeLink: z.string().max(500).optional().default(""),
  referralSource: z.string().max(200).optional().default(""),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = partnerApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input.", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const id = `pa-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const now = Date.now();

    const insertResult = await createPartnerApplication({
      id,
      fullName: d.fullName,
      phone: d.phone,
      email: d.email,
      networkSectorsJson: JSON.stringify(d.networkSectors),
      experience: d.experience,
      whyGenezisi: d.whyGenezisi,
      clientPlan: d.clientPlan,
      resumeLink: d.resumeLink,
      referralSource: d.referralSource,
      createdAt: now,
    });

    if (!insertResult.ok) {
      console.error("Partner application insert error:", insertResult.error);
      return NextResponse.json(
        { error: "Unable to submit application right now." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    console.error("Partner application error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
