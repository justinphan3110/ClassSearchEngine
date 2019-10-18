package classearch.search.App;

import classearch.search.API.Class;
import classearch.search.API.ClassInfoAPI;
import classearch.search.API.ElasticSearchAPI;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class SearchApplication {
    private static final String mongoURI = "mongodb://localhost:27017";
    private static final String mongoDB = "classCrawling";


    public final static ElasticSearchAPI elasticSearchAPI = ElasticSearchAPI.makeConnection();
    public final static ClassInfoAPI classInfoAPI = ClassInfoAPI.makeConnection(mongoURI, mongoDB);


    public static void main(String[] args) {

        if(elasticSearchAPI.isConnected())
            SpringApplication.run(SearchApplication.class, args);
        else
            System.out.println("Failed Elastic Search");
    }
}
