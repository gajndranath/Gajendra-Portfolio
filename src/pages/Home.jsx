import HeroSection from "../components/sections/HeroSection";
import { TracingBeam } from "../components/ui/TracingBeam";

const Home = () => (
  <TracingBeam className="relative w-full">
    <div className="antialiased">
      <HeroSection
        title="Hola Amigo"
        quote="Software engineering is the art of crafting solutions from chaos—transforming complex problems into elegant, efficient code."
        name="Gajendra"
        role="Front End Developer ////"
        agency="Galas"
        academics="Bachelor of Computer Application"
        certificates={[
          {
            name: "Become a Full-Stack Web Developer",
            url: "https://www.linkedin.com/learning/certificates/2c80b0f9420496ee65e2d0350c70a4ec6999c10651f0548bc80494035eb73e3a",
          },
          {
            name: "Blackbird Australia - Software Engineering Job Simulation",
            url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Blackbird/8XSySTLv68WYeFhke_Blackbird%20Australia_8GuAKa3B4BWkjEy3e_1717944231964_completion_certificate.pdf",
          },
          {
            name: "Amazon Web Services Cloud Practitioner",
            url: "https://www.aws.training/Transcript/CompletionCertificateHtml?transcriptid=1HfEsAQHhUiOhINPqpoVcg2",
          },
          {
            name: "Diploma in E-Commerce Website",
            url: "https://alison.com/certification/check/$2y$10$cD0s7wDBftV0dDeLq8yE4OI83ehX5NC3WMVY0tZJyrnqDZ.mHK8e",
          },
        ]}
      />
    </div>
  </TracingBeam>
);

export default Home;
