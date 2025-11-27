import { collectionsData } from "@/lib/constants";

export default async function sitemap() {
  const baseURL = "https://www.shopmirmee.com";

  // --- Static Pages ---
  const staticPages = [
    "",
    "/add-testimonial",
    "/cart",
    "/checkout",
    "/thankyou",
    "/collections",
  ].map((path) => ({
    url: `${baseURL}${path}`,
    lastModified: new Date(),
  }));

  // --- Dynamic Collections (collections/[slug]) ---
  const collectionPages = collectionsData.map((collection) => ({
    url: `${baseURL}/collections/${collection.link}`,
    lastModified: new Date(),
  }));

  // --- Dynamic Products (collections/[slug]/[id]) ---
  // Fetch products from your API
  let productPages: any[] = [];

  try {
    const res = await fetch(`${baseURL}/api/products`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();

    productPages = json.data.map((product: any) => ({
      url: `${baseURL}/collections/${product.collectionSlug}/${product.slug}`,
      lastModified: new Date(product.updatedAt || new Date()),
    }));
  } catch (error) {
    console.error("Sitemap product fetch failed:", error);
  }

  return [
    ...staticPages,
    ...collectionPages,
    ...productPages,
  ];
}
