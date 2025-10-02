import React from "react";

type AboutPageProps = {
  className?: string;
};

export const AboutPage = ({ className = "" }: AboutPageProps) => {
  return (
    <section className={`container mx-auto p-6 lg:px-8 ${className}`}>
      <header className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
          About Us
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante venenatis, suscipit nisl at, lacinia nunc.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#mission"
            className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Our mission
          </a>
          <a
            href="#team"
            className="inline-flex items-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Meet the team
          </a>
        </div>
      </header>
      {/* Mission & Vision */}
      <section id="mission" className="mt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-gray-600">
              I hope this test will pass the interview test and I am genuinely
              excited about the opportunity to demonstrate my skills, my
              dedication, and my ability to contribute meaningfully to the
              organization. My mission is to showcase not only technical
              proficiency but also a strong work ethic, adaptability, and the
              willingness to continuously learn and grow within the company. I
              believe that joining Atome will allow me to make a positive impact
              while working with a team that values innovation and collaboration.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-800">Vision</h3>
            <p className="mt-3 text-gray-600">
              My vision is to become a valuable team member who contributes to
              Atome’s goals by embracing challenges, driving creative solutions,
              and fostering collaboration across teams. I aim to grow alongside
              the company, learning from mentors and colleagues, while actively
              sharing my own perspectives to strengthen the team. Ultimately, I
              envision a future where my contributions help Atome innovate,
              succeed, and make an even greater impact in the industry, while I
              personally develop into a more experienced and versatile
              professional.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}