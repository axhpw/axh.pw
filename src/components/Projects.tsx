/** @jsxImportSource hono/jsx */

import { ProjectCard } from "./ProjectCard";

const projects = [
    {
        title: "Me",
        subtitle: "Personal growth as an active build",
        description: 
            "As an IT student working full time in the restaurant industry as a Shift Leader / Expeditor I am actively building new skills in communication and problem solving along side staying up-to-date with software and tech. "
    }
]

export const Projects = () => {
    return (
        <section class="projects-sections">
            <h2>What I'm Building</h2>
            <div class="projects-grid">
                {projects.map((project) => (
                    <ProjectCard
                    title={project.title}
                    subtitle={project.subtitle}
                    description={project.description}
                    />
                ))}
            </div>
        </section>
    )
}