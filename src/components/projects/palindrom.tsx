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
      <CodeEditor id="2" userId={userId} projectId={projectId}>
        <p>Gunakan rumus untuk mengonversi suhu dari Celsius ke Fahrenheit</p>
      </CodeEditor>
      <CodeEditor id="3" userId={userId} projectId={projectId}>
        <p>Gunakan rumus untuk mengonversi suhu dari Celsius ke Reamur</p>
      </CodeEditor>
      <CodeEditor id="4" userId={userId} projectId={projectId}>
        <p>Gunakan rumus untuk mengonversi suhu dari Celsius ke Kelvin</p>
      </CodeEditor>
      <CodeEditor id="5" userId={userId} projectId={projectId}>
        <p>
          Gunakan rumus untuk mengonversi suhu masing-masing dari Fahrenheit,
          Reamur, dan Kelvin ke Celcius
        </p>
      </CodeEditor>
    </div>
  );
}
