package classearch.search.API;

import classearch.search.*;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;


import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchPhraseQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ElasticSearchAPI {
    public static final String defaultINDEX = "classes";

    // localHost credentials
    private static final String HOST = "localhost";
    private static final int PORT_ONE = 9200;
    private static final String SCHEME = "http";

    // cloud credentials
    private static final String USE_NAME = "elastic";
    private static final String PASSWORD = "M7vbKNXotX9fLKZqQpv5cfxq";
    private static final String END_URL = "94a45c0e05584bedaca8de4e7b5564b8.us-central1.gcp.cloud.es.io";

    private static RestHighLevelClient client;
    private String index;

    private ElasticSearchAPI(String index){
        this.index = index;
    }

    public static final ElasticSearchAPI of(String index){
        Objects.requireNonNull(index, "index can not be null");

        return new ElasticSearchAPI(index);

    }

    public boolean isConnected(){
        return this.client != null;
    }

    public  final RestHighLevelClient makeConnectionLower(){
        if(client == null) {
            final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(USE_NAME, PASSWORD));
            RestClientBuilder restClientBuilder = RestClient.builder(
                    new HttpHost(END_URL, 9243,"https"))
                    .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                        @Override
                        public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpAsyncClientBuilder) {
                            return httpAsyncClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                        }
                    });
            client = new RestHighLevelClient(restClientBuilder);
        }
        return client;
    }

    public final RestHighLevelClient makeConnection() {
        if(client == null) {
            try {
                System.out.println("making connection to elastic search");
                client = new RestHighLevelClient(RestClient.builder(
                        new HttpHost(HOST, PORT_ONE, SCHEME)
                ));
                System.out.println("connected to elastic search");
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        return client;
    }

    public final void closeConnection(){
        if(client != null) {
            try {
                client.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        client = null;
    }

    public List<Class> simpleMatchPhraseSearch(String field, String text, int slop) throws IOException {SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(new MatchPhraseQueryBuilder(field, text).slop(slop));
        SearchResponse searchResponse = client.search(searchRequest.source(searchSourceBuilder), RequestOptions.DEFAULT);

        return classExtract(searchResponse.toString());
    }

    public List<Class> boolSearch(String text) throws IOException {
        return boolSearch("Description", "NAME", 10,10, text);
    }

    public List<Class> boolSearch(String field1, String field2, int slop1, int slop2, String text) throws IOException {
        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder qb = QueryBuilders.boolQuery();

        MatchPhraseQueryBuilder matchPhraseQueryBuilder1 = new MatchPhraseQueryBuilder(field1, text).slop(slop1);
        MatchPhraseQueryBuilder matchPhraseQueryBuilder2 = new MatchPhraseQueryBuilder(field2, text).slop(slop2);
        qb.should(matchPhraseQueryBuilder1);
        qb.should(matchPhraseQueryBuilder2);

        searchSourceBuilder.query(qb);
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        return classExtract(searchResponse.toString());
    }

    private List<Class> classExtract(String json){
        List<Class> result = new ArrayList<>();
        JsonObject jsonObject = new JsonObject(json);
        JsonArray classes = jsonObject.getJsonObject("hits").getJsonArray("hits");
        classes.forEach(cl -> {
           JsonObject source = ((JsonObject) cl).getJsonObject("_source");
           result.add(Class.of(
                   source.getString("CODE"),
                   source.getString("ID"),
                   source.getString("NAME"),
                   source.getString("Description"),
                   source.getString("UNIT"),
                   source.toString()
           ));
        });
        return result;
    }

    public static void main(String[] args) throws IOException {
        ElasticSearchAPI api = ElasticSearchAPI.of(defaultINDEX);
        api.makeConnectionLower();
        System.out.println("connected");
        List<Class> ans = api.boolSearch("Description", "NAME", 5,5, "stock");
        System.out.println(ans);

        api.closeConnection();

    }


}
