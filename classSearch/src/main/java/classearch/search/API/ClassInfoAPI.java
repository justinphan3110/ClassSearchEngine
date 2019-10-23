package classearch.search.API;

import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import  com.mongodb.client.model.Filters;
import io.vertx.core.json.JsonObject;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class ClassInfoAPI {

    private final MongoDatabase database;
    private final MongoClient mongoClient;

    private ClassInfoAPI(MongoDatabase database, MongoClient mongoClient){
        this.database = database;
        this.mongoClient = mongoClient;
    }

    public static final ClassInfoAPI makeConnection(String URI, String DATABASE){
        MongoClient mongoClient = new MongoClient(new MongoClientURI(URI));
        MongoDatabase db = mongoClient.getDatabase(DATABASE);

        return new ClassInfoAPI(db, mongoClient);
    }

    public final void closeConnection(){
        System.out.println("closing mongoClient");
        mongoClient.close();
    }

    public List<Meeting> classInfo(String collectionName, String code){
        MongoCollection<Document> collection = database.getCollection(collectionName);

        BasicDBObject searchQuery = new BasicDBObject();
        searchQuery.put("Code", code);

        List<Meeting> meetings = new ArrayList<>();

        MongoCursor<Document> cursor = collection.find(Filters.eq("Code", code)).iterator();
        try{
            while(cursor.hasNext()) {
                JsonObject jsonObject = new JsonObject(cursor.next().toJson());
                if(!jsonObject.getString("Component").equals("REC"))
                    meetings.add(Meeting.of(
                            jsonObject.getString("Code"),
                            jsonObject.getString("Room"),
                            jsonObject.getString("Component"),
                            Integer.parseInt(jsonObject.getString("number")),
                            jsonObject.getString("DayTime"),
                            jsonObject.getString("Instructor")
                    ));

            }
        }finally {
            cursor.close();
        }

        return meetings;
    }

    public static void main(String[] args) {
        ClassInfoAPI classInfoAPI = ClassInfoAPI.makeConnection("mongodb://localhost:27017", "classCrawling");
        System.out.println(classInfoAPI.classInfo("fall2019", "acct101"));
    }
}
