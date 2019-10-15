package classearch.search.App;

import classearch.search.API.ElasticSearchAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SearchApplication {
    public final static ElasticSearchAPI elasticSearchAPI = ElasticSearchAPI.of(ElasticSearchAPI.defaultINDEX);

    static {
        elasticSearchAPI.makeConnection();
//        elasticSearchAPI.makeConnectionLower();
    }

    public static void main(String[] args) {
        if(elasticSearchAPI.isConnected())
            SpringApplication.run(SearchApplication.class, args);
        else
            System.out.println("Failed Elastic Search");
    }
}
