// One of this website's published galleries from the Headless CMS, by its Gallery Code (slug),
// or null when there is none. Server Components only.
import { cmsFetch } from "./cmsFetch";

export function getGallery(slug) {
  return cmsFetch(`/api/public/galleries/${slug}`, {
    tag: "galleries",
    empty: null,
    notFound: null,
  });
}
