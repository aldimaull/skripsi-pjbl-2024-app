"use client";

import CodeEditor from "../CodeEditor";

export default function ClientComponentExample({
  userId,
  projectId,
}: {
  userId: string;
  projectId: number;
}) {
  return (
    <div className="space-y-4">
      <CodeEditor id="1" userId={userId} projectId={projectId}>
        <p>
          Pertama, tentukan suhu awal yang ingin kamu konversi. Pilih empat
          variabel, satu untuk menyimpan suhu dalam Celsius dan tiga sisanya
          lagi untuk menyimpan suhu dalam Fahrenheit, Reamur, dan Kelvin.
        </p>
      </CodeEditor>
    </div>
  );
}
