import { globSync } from "glob";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

const baseUrl = "https://www.gajndra.com"; // Replace with your website URL

// Get all .html files from the public directory
const pages = globSync("public/**/*.html");

// Function to extract images with alt text from an HTML file
const extractImages = (html) => {
  const { document } = new JSDOM(html).window;
  return Array.from(document.querySelectorAll("img")).map((img) => ({
    url: new URL(img.src, baseUrl).href, // Ensure URL is absolute
    title: img.alt || "Image Title",
  }));
};

// Function to extract anchor tags from an HTML file
const extractAnchors = (html) => {
  const { document } = new JSDOM(html).window;
  return Array.from(document.querySelectorAll("a")).map(
    (anchor) => new URL(anchor.href, baseUrl).href
  );
};

// Function to extract dynamic content like news, videos, and blogs
const extractDynamicContent = (html) => {
  const { document } = new JSDOM(html).window;
  const dynamicContent = {};

  // Example dynamic content extraction
  dynamicContent.videos = Array.from(document.querySelectorAll("video")).map(
    (video) => ({
      url: new URL(video.src, baseUrl).href,
      title: video.title || "Video Title",
    })
  );

  dynamicContent.news = Array.from(
    document.querySelectorAll(".news-article")
  ).map((article) => ({
    url: new URL(article.querySelector("a").href, baseUrl).href,
    title: article.querySelector("h1").textContent || "News Title",
  }));

  dynamicContent.blogs = Array.from(
    document.querySelectorAll(".blog-post")
  ).map((post) => ({
    url: new URL(post.querySelector("a").href, baseUrl).href,
    title: post.querySelector("h1").textContent || "Blog Title",
  }));

  return dynamicContent;
};

// Function to generate the sitemap
const generateSitemap = async () => {
  const links = pages.map((page) => {
    const relativePath = path.relative("public", page);
    const loc = relativePath.replace(/\\/g, "/").replace(/index.html$/, "");

    // Read the HTML file
    const html = fs.readFileSync(page, "utf-8");
    const images = extractImages(html);
    const anchors = extractAnchors(html);
    const dynamicContent = extractDynamicContent(html);

    return {
      url: `${baseUrl}/${loc}`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date(fs.statSync(page).mtime).toISOString(), // Last modified date
      images, // Images
      videos: dynamicContent.videos || [], // Videos
      news: dynamicContent.news || [], // News articles
      blogs: dynamicContent.blogs || [], // Blog posts
      xhtmlLinks: anchors.map((link) => ({
        rel: "alternate",
        href: link,
        hreflang: "en", // Adjust as needed
      })),
    };
  });

  // Add the homepage separately with a higher priority
  links.unshift({
    url: baseUrl,
    changefreq: "daily",
    priority: 1.0,
  });

  const stream = new SitemapStream({ hostname: baseUrl });

  try {
    const data = await streamToPromise(Readable.from(links).pipe(stream));
    fs.writeFileSync("public/sitemap.xml", data.toString());
    console.log("Sitemap has been generated!");
  } catch (err) {
    console.error("Error generating sitemap:", err);
  }
};

generateSitemap();
