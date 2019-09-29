package search;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import search.ElasticSearchAPI;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.List;

public class Server {
    private static ElasticSearchAPI elasticSearchAPI;
//    static class MyHandler implements HttpHandler {


//        @Override
//        public void handle(HttpExchange t) throws IOException {
//            String query = t.getRequestURI().getQuery();
//
//            List<Class> list = elasticSearchAPI.boolSearch("Description", "NAME", 5,5, query);
//
//            t.sendResponseHeaders(200, Integer.MAX_VALUE);
//            OutputStream os = t.getResponseBody();
//            for(Class c: list)
//                os.write(list.toString().getBytes());
//            System.out.println("dont shut down");
//            os.close();
//        }
//    }
//    public static void main(String[] args) throws IOException {
//
//        elasticSearchAPI = ElasticSearchAPI.of("classes", new String[] {"NAME", "Description"});
//        elasticSearchAPI.makeConnection();
//
//        HttpServer server = HttpServer.create(new InetSocketAddress(3110), 0);
//        server.createContext("/test", new MyHandler());
//        server.setExecutor(null); // creates a default executor
//        server.start();
//        elasticSearchAPI.closeConnection();
//    }
}
