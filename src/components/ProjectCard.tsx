/** @jsxImportSource hono/jsx */

type ProjectCardProps = {
    title: string,
    subtitle?: string,
    description: string
}

export const ProjectCard = ({
    title,
    subtitle,
    description
}: ProjectCardProps) => {
    return (
        <article class="project-card">
            <h3>{title}</h3>
            {subtitle && <p class="project-subtitle">{subtitle}</p>}
            <p class="project-description">{description}</p>
        </article>
    )
}