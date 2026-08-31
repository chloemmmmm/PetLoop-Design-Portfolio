export function MediaFrame({ src, alt, caption, priority = false }: { src: string; alt: string; caption?: string; priority?: boolean }) {
  return <figure className="media-frame"><img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />{caption ? <figcaption>{caption}</figcaption> : null}</figure>
}
