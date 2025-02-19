"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  const steps = [
    {
      title: "Step 1",
      description: (
        <>
          Log into YouTube at{" "}
          <Link href="https://youtube.com" target="_blank" className="text-blue-400 underline">
            youtube.com
          </Link>
        </>
      ),
    },
    {
      title: "Step 2",
      description: (
        <>
          Export cookies using `Get cookies.txt LOCALLY` chrome extension or do{" "}
          <Link href="/steps" className="text-blue-400 underline">this</Link>
        </>
      ),
    },
    {
      title: "Step 3",
      description: "Paste the playlist link, choose format and click 'Convert'",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center py-16">
      <h2 className="text-3xl font-bold text-white mb-10">How to get the cookies 🍪</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-6">
        {steps.map((step, index) => (
          <Card key={index} className="bg-neutral-900 border border-neutral-700 shadow-lg rounded-xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-neutral-400 mt-3">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
