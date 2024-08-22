import Questions from "@/components/assessment/Questions";
import ButtonBack from "@/components/ui/ButtonBack";

const AssessmentPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ButtonBack />
      <h1 className="mb-4 text-primary font-serif tracking-wide">Assessment</h1>
      <Questions params={params} />
    </>
  );
};

export default AssessmentPage;
