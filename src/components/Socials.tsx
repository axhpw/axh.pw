/** @jsxImportSource hono/jsx */

type Social = {
    name: string,
    url: string
}

const socials: Social[] = [
    {
        name: "GitHub",
        url: "https://github.com/axhpw"
    },
    {
        name: "Bluesky",
        url: "https://bsky.app/profile/axh.pw"
    }
]

export const Socials = () => {
    return (
        <div class="links">
            {socials.map((social) => (
                <a 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                >
                {social.name}
                </a>
            ))}
        </div>
    )
}