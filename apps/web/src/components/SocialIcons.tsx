import type { SocialLinks } from '#/lib/settings'
import FacebookIcon from '#/icons/Facebook'
import InstagramIcon from '#/icons/Instagram'
import XIcon from '#/icons/X'
import YoutubeIcon from '#/icons/YouTube'
import TiktokIcon from '#/icons/TikTok'

export default function SocialIcons({ social, className }: { social?: SocialLinks, className?: string }) {
  if (!social) {
    return null
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {social.facebook && (
        <a href={social.facebook.url} target="_blank" rel="noreferrer">
          <span className="sr-only">{social.facebook.name}</span>
          <FacebookIcon />
        </a>
      )}

      {social.instagram && (
        <a href={social.instagram.url} target="_blank" rel="noreferrer">
          <span className="sr-only">{social.instagram.name}</span>
          <InstagramIcon />
        </a>
      )}

      {social.x && (
        <a href={social.x.url} target="_blank" rel="noreferrer">
          <span className="sr-only">{social.x.name}</span>
          <XIcon />
        </a>
      )}

      {social.youtube && (
        <a href={social.youtube.url} target="_blank" rel="noreferrer">
            <span className="sr-only">{social.youtube.name}</span>
            <YoutubeIcon />
        </a>
      )}
      
      {social.tiktok && (
        <a href={social.tiktok.url} target="_blank" rel="noreferrer">
            <span className="sr-only">{social.tiktok.name}</span>
            <TiktokIcon />
        </a>
      )}
    </div>
  )
}