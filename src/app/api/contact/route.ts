import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phoneOrSubject, message } = body;

    if (!name || !email || !phoneOrSubject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phoneOrSubject: phoneOrSubject.trim(),
        message: message.trim(),
      },
    });

    // Send email alert — don't let email failure break the response
    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "awaisafzal196@gmail.com",
        subject: `New contact query: ${phoneOrSubject.trim()}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Subject:</strong> ${phoneOrSubject.trim()}</p>
          <p><strong>Message:</strong></p>
          <p>${message.trim()}</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email alert:", emailError);
      // Don't throw — contact is already saved, email failure shouldn't break UX
    }

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}