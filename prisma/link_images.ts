import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Load environment variables
config({ path: path.resolve(process.cwd(), ".env"), override: true });

const prisma = new PrismaClient();
const PICTURES_DIR = path.join(process.cwd(), "public", "images", "pictures");
const DB_BASE_PATH = "/images/pictures/";

async function main() {
  console.log("--- Starting Image Linking Process ---");

  if (!fs.existsSync(PICTURES_DIR)) {
    console.error(`Directory not found: ${PICTURES_DIR}`);
    process.exit(1);
  }

  // 1. Get all files in the directory
  const files = fs.readdirSync(PICTURES_DIR);
  console.log(`Found ${files.length} files in ${PICTURES_DIR}`);

  // 2. Fetch all products
  const products = await prisma.product.findMany({
    select: { id: true, name: true }
  });
  console.log(`Fetched ${products.length} products from database`);

  let updatedCount = 0;
  let missingCount = 0;

  // 3. Match and Update
  for (const product of products) {
    // We look for Name_1.webp, Name_1.png, etc.
    // Some names have " instead of _ or - in the DB but _ in OS. 
    // We normalize the search string.
    const normalizedName = product.name.replace(/["\/\*\:\<\>\?\|]/g, "_").trim();
    
    // Pattern to look for: "ProductName_1"
    const match = files.find(f => {
      const fileName = path.parse(f).name; // Name without extension
      return fileName.toLowerCase() === `${normalizedName.toLowerCase()}_1` || 
             fileName.toLowerCase() === normalizedName.toLowerCase();
    });

    if (match) {
      const imageUrl = `${DB_BASE_PATH}${match}`;
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl }
      });
      console.log(`[OK] Matched: "${product.name}" -> ${match}`);
      updatedCount++;
    } else {
      // Fallback: try to find ANY image that starts with the product name
      const fallbackMatch = files.find(f => f.toLowerCase().startsWith(normalizedName.toLowerCase()));
      if (fallbackMatch) {
         const imageUrl = `${DB_BASE_PATH}${fallbackMatch}`;
         await prisma.product.update({
           where: { id: product.id },
           data: { imageUrl }
         });
         console.log(`[FW] Fallback Match: "${product.name}" -> ${fallbackMatch}`);
         updatedCount++;
      } else {
         console.warn(`[??] No image found for: "${product.name}" (Normalized: ${normalizedName})`);
         missingCount++;
      }
    }
  }

  console.log("\n--- Linking Completed ---");
  console.log(`Updated: ${updatedCount}`);
  console.log(`Missing: ${missingCount}`);
}

main()
  .catch(e => {
    console.error("Fatal error during linking:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
