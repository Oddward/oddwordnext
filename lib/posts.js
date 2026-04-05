import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { normalizePostType } from './postTypes';

const postsDirectory = path.join(process.cwd(), 'posts');

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean).map(String);
  if (typeof tags === 'string') {
    // Support "tag1, tag2" or "tag1" in frontmatter.
    return tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  // Support single non-string values (e.g. number) without crashing render.
  return [String(tags)];
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id (postType normalized for grouping and layouts).
    return {
      id,
      ...matterResult.data,
      tags: normalizeTags(matterResult.data?.tags),
      postType: normalizePostType(matterResult.data?.postType),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// get posts file names with md
export function getAllPostIds() {
    const fileNames = fs.readdirSync( postsDirectory )

    return fileNames.map(( fileName ) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data,
      tags: normalizeTags(matterResult.data?.tags),
      postType: normalizePostType(matterResult.data?.postType),
    };
  }

/** Posts of one type, same date sort as getSortedPostsData. */
export function getPostsByPostType(postType) {
  const target = normalizePostType(postType);
  return getSortedPostsData().filter((p) => p.postType === target);
}
