import { Client, Databases, Query, ID } from "appwrite";

const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")  // API endpoint
    .setProject(project_id);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        // 1. Check if the search term exists in the database
        const result = await database.listDocuments(database_id, collection_id, [
            Query.equal('searchTerm', searchTerm)
        ]);

        if (result.documents.length > 0) {
            const document = result.documents[0];

            // 2. If it exists, increment the count
            await database.updateDocument(database_id, collection_id, document.$id, {
                count: document.count + 1,
            });
        } else {
            // 3. Otherwise, create a new document
            await database.createDocument(database_id, collection_id, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(error);
    }
};


export const getTrendingMovies = async () => {
    try{
        const result = await database.listDocuments(database_id, collection_id, [
            Query.limit(5),
            Query.orderDesc("count"),
        ]);
        return result.documents;
    }catch(error){
        console.error(error);
    }
}