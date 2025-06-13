import Header from "@/components/header"
import Footer from "@/components/footer"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import GoalsSection from "@/components/sections/goals-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GoalsSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  )
}
