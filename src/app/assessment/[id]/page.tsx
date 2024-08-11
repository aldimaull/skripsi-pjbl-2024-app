import Questions from "@/components/assessment/Questions";

const AssessmentPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <h1 className="mb-4 text-primary font-serif tracking-wide">Assessment</h1>
      <Questions params={params} />
    </>
  );
};

export default AssessmentPage;
