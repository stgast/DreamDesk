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
  console.log("--- Starting Image Path Synchronization ---");

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
    // Normalization logic
    const normalizedName = product.name.replace(/["\/\*\:\<\>\?\|]/g, "_").trim();
    
    // We search for Name_1 (primary image)
    // We try to find any file that starts with the product name and ends with _1.ext
    const match = files.find(f => {
      const fileName = path.parse(f).name.toLowerCase();
      const searchPattern = `${normalizedName.toLowerCase()}_1`;
      return fileName === searchPattern || fileName === normalizedName.toLowerCase();
    });

    if (match) {
      // Store plain path, component will encode it
      const imageUrl = `${DB_BASE_PATH}${match}`;
      
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl }
      });
      console.log(`[OK] Matched: "${product.name}" -> ${match}`);
      updatedCount++;
    } else {
      // Fallback: search for partial match
      const partialMatch = files.find(f => {
        const lowerF = f.toLowerCase();
        const lowerN = normalizedName.toLowerCase();
        return (lowerF.includes(lowerN) || lowerN.includes(lowerF)) && lowerF.includes("_1");
      });

      if (partialMatch) {
        const imageUrl = `${DB_BASE_PATH}${partialMatch}`;
        await prisma.product.update({
          where: { id: product.id },
          data: { imageUrl }
        });
        console.log(`[PARTIAL] matched "${product.name}" with "${partialMatch}"`);
        updatedCount++;
      }
 else {
        console.warn(`[MISSING] No match found for: "${product.name}"`);
        missingCount++;
      }
    }
  }

  console.log("\n--- Sync Completed ---");
  console.log(`Updated: ${updatedCount}`);
  console.log(`Missing: ${missingCount}`);
}

main()
  .catch(e => {
    console.error("Fatal error during sync:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
