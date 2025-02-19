"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

const steps = [
  {
    number: "1",
    title: "Open Developer Tools and go to the Console tab",
    description:
      "Press 'Ctrl + Shift + I' to open Developer Tools. Navigate to the 'Console' tab.",
  },
  {
    number: "2",
    title: "Paste the following JavaScript code and run it, don't worry it's safe",
    description: "Copy the code below, paste it into the Console, and press 'Enter'.",
    code: `(function() {
    let cookies = document.cookie.split("; ");
    let output = "# Netscape HTTP Cookie File\\n";
    let domain = document.domain.startsWith(".");

    cookies.forEach(cookie => {
        let [name, value] = cookie.split("=");
        output += \`\${domain}\\tTRUE\\t/\\tFALSE\\t0\\t\${name}\\t\${value}\\n\`;
    });

    console.log(output);
})();`,
  },
  {
    number: "3",
    title: "Copy the output",
    description:
      "The script prints the cookies in Netscape format. Copy the output and save it in a txt file then upload it on the home page.",
  },
];

export default function Page() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center py-16">
      <h2 className="text-3xl font-bold text-white mb-6">How to Export Cookies (Netscape Format)</h2>


      <div className="w-full max-w-3xl mb-8">
        <Image
          src="/image.png"
          alt="Developer Tools Screenshot"
          width={800}
          height={450}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl px-6">
        {steps.map((step, index) => (
          <Card key={index} className="bg-neutral-900 border border-neutral-700 shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-white bg-neutral-800 px-3 py-1 rounded-full">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-neutral-400 mt-3">{step.description}</p>
              {step.code && (
                <div className="relative bg-black text-white p-4 mt-4 rounded-xl text-sm font-mono">
                  <pre className="overflow-x-auto">{step.code}</pre>
                  <button
                    onClick={() => handleCopy(step.code!)}
                    className="absolute top-2 right-2 bg-neutral-700 px-3 py-1 text-xs rounded"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
