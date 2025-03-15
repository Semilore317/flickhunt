import { Client, Databases, ID, Query } from "appwrite";

// Use process.env instead of import.meta.env for Vercel
const project_id = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collection_id = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

// Initialize Appwrite client
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Ensure this is correct
    .setProject(project_id);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        // Check if the search term exists in the database
        const result = await database.listDocuments(database_id, collection_id, [
            Query.equal("searchTerm", searchTerm),
        ]);

        if (result.documents.length > 0) {
            // If it exists, increment the count
            const document = result.documents[0];

            await database.updateDocument(database_id, collection_id, document.$id, {
                count: document.count + 1, // Fix: Removed `data:` and incorrect syntax
            });
        } else {
            // Else, create a new document
            await database.createDocument(database_id, collection_id, ID.unique(), {
                searchTerm,
                count: 1,
            });
        }
    } catch (error) {
        console.error("Appwrite Error:", error);
    }
};
