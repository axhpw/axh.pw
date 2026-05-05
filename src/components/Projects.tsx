/** @jsxImportSource hono/jsx */

import { ProjectCard } from "./ProjectCard";

type Project = {
  title: string
  subtitle: string
  description: string
}

export const Projects = ({ projects }: { projects: Project[] }) => {
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