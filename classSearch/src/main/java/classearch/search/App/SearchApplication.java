package classearch.search.App;

import classearch.search.API.ElasticSearchAPI;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SearchApplication {
    public final static ElasticSearchAPI elasticSearchAPI = ElasticSearchAPI.of(ElasticSearchAPI.defaultINDEX);

    static {
        elasticSearchAPI.makeConnection();
    }

    public static void main(String[] args) {
        SpringApplication.run(SearchApplication.class, args);
    }
}
