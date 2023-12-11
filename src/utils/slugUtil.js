// Function to create a slug from a string
export function createSlug(string) {
  const trimmedString = string.trim();
  return trimmedString
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove any non-alphanumeric characters and hyphens
    .replace(/--+/g, '-'); // Replace multiple consecutive hyphens with a single hyphen
}

export async function createUniqueSlug(string, ModelObj) {
  let slug = createSlug(string);
  let suffix = 2;

  if( !ModelObj ) { return slug;}

  // Dynamically fetch the Mongoose model based on the modelName string
  //const Model = require(`@/models/${ModelObj.toLowerCase()}`).default;

  let isSlugExist = await ModelObj.findOne({ slug });
  
  while (isSlugExist) {
    let newSlug = `${slug}-${suffix}`;
    isSlugExist = await ModelObj.findOne({ slug: newSlug });
    
    if (!isSlugExist) {
      slug = newSlug;
    }

    suffix++;
  }

  return slug;
}