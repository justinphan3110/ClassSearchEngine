package classearch.search.API;

import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import  com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.List;

public class ClassInfoAPI {

    private final MongoDatabase database;

    private ClassInfoAPI(MongoDatabase database){
        this.database = database;

    }

    public static final ClassInfoAPI makeConnection(String URI, String DATABASE){
        MongoClient mongoClient = new MongoClient(new MongoClientURI(URI));
        MongoDatabase db = mongoClient.getDatabase(DATABASE);

        return new ClassInfoAPI(db);
    }

    public List<Meeting> classInfo(String collectionName, String code){
        MongoCollection<Document> collection = database.getCollection(collectionName);

        BasicDBObject searchQuery = new BasicDBObject();
        searchQuery.put("Code", code);

        Block<Document> printBlock = new Block<Document>() {
            @Override
            public void apply(Document document) {
                System.out.println(document.toJson());
            }
        };

        collection.find(Filters.eq("Code", code)).forEach(printBlock);

        return null;
    }

    public static void main(String[] args) {
        ClassInfoAPI classInfoAPI = ClassInfoAPI.makeConnection("mongodb://localhost:27017", "classCrawling");
        classInfoAPI.classInfo("Fall 2019", "ACCT101");
    }
}
