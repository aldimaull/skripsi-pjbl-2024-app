import { AssessmentForm } from "@/components/(guru)/Assessment";
import ButtonBack from "@/components/ui/ButtonBack";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="font-serif tracking-wide text-primary">Buat Soal</h1>
      <ButtonBack />
      <AssessmentForm />
    </>
  );
};

export default page;
