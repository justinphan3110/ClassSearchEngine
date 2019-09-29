package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import search.ElasticSearchAPI;

@SpringBootApplication
public class App {
    public static final ElasticSearchAPI elasticSearchAPI = ElasticSearchAPI.of(ElasticSearchAPI.defaultINDEX);

    static {
        elasticSearchAPI.makeConnection();
    }
    public static void main(String[] args){
//        SpringBootApplication.run(App.class, args);
    }
}
