package app;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import search.Class;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping()
public class ElasticSearchController {

    public static final String SEARCH = "search";

    @RequestMapping(value =  "{text")
    public List<Class> getClass(@PathVariable final String text) throws IOException {
        List<Class> list = App.elasticSearchAPI.boolSearch("Description","NAME",5,5, text);
        return list;
    }
}
