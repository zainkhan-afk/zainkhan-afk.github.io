import AboutHead from "@/components/about/Head";
import ProfessionalSummary from "@/components/about/ProfessionalSummary";
import AboutSkills from "@/components/about/Skills";
import AboutWorkExperience from "@/components/about/WorkExperience";
import AboutEducation from "@/components/about/Education";

export const metadata = {
  title: "About | Zain Khan",
  description: "AI developer, creative coder, builder of things.",
};

export default function About() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <AboutHead />
      <ProfessionalSummary />
      <AboutSkills />
      <AboutWorkExperience />
      <AboutEducation />
    </div>
  );
}
