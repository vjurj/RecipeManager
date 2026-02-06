import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		heroImage: z.string().optional().default("/RecipeManager/images/blog-placeholder-about.jpg"),
		tags: z.array(z.string()).optional().default([]),
	}),
});

export const collections = { blog };
