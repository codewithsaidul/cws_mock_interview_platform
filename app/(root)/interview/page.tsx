import Agent from "@/components/Agent";

const page = () => {
  return (
    <>
      <h3>Interview Generation</h3>

      <Agent userName="You" userId="userid" type="generate" />
    </>
  );
};

export default page;
