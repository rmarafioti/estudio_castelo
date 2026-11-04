// Tests for getGallery: its wiring to cmsFetch (path, tag, empty and notFound values).
import { describe, expect, it, vi } from "vitest";

import { mockFetch } from "@/test/helpers";
import { getGallery } from "./getGallery";

function stubCmsEnv() {
  vi.stubEnv("HEADLESS_CMS_API_URL", "https://cms.test");
  vi.stubEnv("HEADLESS_CMS_API_KEY", "test-api-key");
}

describe("getGallery", () => {
  it("requests /api/public/galleries/:slug with the 'galleries' tag", async () => {
    stubCmsEnv();
    const fetchMock = mockFetch({ body: { data: { slug: "test-slug" } } });

    await getGallery("test-slug");

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://cms.test/api/public/galleries/test-slug");
    expect(init.next.tags).toEqual(["cms", "galleries"]);
  });

  it("returns null when HEADLESS_CMS_API_URL is unset", async () => {
    mockFetch({ body: { data: { slug: "test-slug" } } });

    const gallery = await getGallery("test-slug");

    expect(gallery).toBeNull();
  });

  it("returns null when the CMS returns 404", async () => {
    stubCmsEnv();
    mockFetch({
      status: 404,
      body: { error: { message: "Gallery not found." } },
    });

    const gallery = await getGallery("test-slug");

    expect(gallery).toBeNull();
  });
});
